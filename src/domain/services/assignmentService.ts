import courseRepositoryInstance, { CourseRepository } from "@/src/data/repositories/courseRepository";
import { AssignmentData, AssignmentInfo } from "../models/assignment";
import { ManaboDirectoryInfo } from "../models/course";
import { TimetableData } from "../models/timetable";

export interface AssignmentService {
    getDirectory(manaboCourseId: string): Promise<ManaboDirectoryInfo>;
    getAssignments(manaboCourseId: string): Promise<AssignmentInfo[]>;
    getAllAssignments(timetable: TimetableData): Promise<AssignmentData>;
}

export class IntegratedAssignmentService implements AssignmentService {
    protected readonly courseRepository: CourseRepository;

    constructor(courseRepository = courseRepositoryInstance) {
        this.courseRepository = courseRepository;
    }

    public async getDirectory(manaboCourseId: string): Promise<ManaboDirectoryInfo> {
        return this.courseRepository.getClassDirectory(manaboCourseId);
    }

    public async getAssignments(manaboCourseId: string): Promise<AssignmentInfo[]> {
        const directories = await this.getDirectory(manaboCourseId);

        const assignment: AssignmentInfo[] = [];

        for (const directory of directories.directories) {
            const contents = await this.courseRepository.getClassContent(manaboCourseId, directory.directoryId);

            assignment.push(
                ...contents.map(
                    (e): AssignmentInfo => ({
                        id: e.contentId,
                        title: e.title,
                        directory: directory.title,
                        status: "not-started",
                    })
                )
            );
        }

        return assignment;
    }

    public async getAllAssignments(timetable: TimetableData): Promise<AssignmentData> {
        let courseIds: string[] = [];
        for (const days of Object.keys(timetable.timetable) as (keyof typeof timetable.timetable)[]) {
            for (const periodKey of Object.keys(timetable.timetable[days])) {
                const period = periodKey as keyof (typeof timetable.timetable)[typeof days];
                const classes = timetable.timetable[days][period];
                courseIds.push(classes?.manaboCourseId ?? "");
            }
        }

        // 重複を排除
        courseIds = Array.from(new Set(courseIds)).filter((id) => id !== "");

        const assignmentData: AssignmentData = {};

        for (const courseId of courseIds) {
            assignmentData[courseId] = await this.getAssignments(courseId);
        }

        return assignmentData;
    }
}

const assignmentServiceInstance = new IntegratedAssignmentService();
export default assignmentServiceInstance;
