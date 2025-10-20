import courseRepositoryInstance, { CourseRepository } from "@/src/data/repositories/courseRepository";
import { ManaboDirectoryInfo } from "../models/course";

export interface AssignmentService {
    getDirectory(manaboCourseId: string): Promise<ManaboDirectoryInfo>;
}

export class IntegratedAssignmentService implements AssignmentService {
    protected readonly courseRepository: CourseRepository;

    constructor(courseRepository = courseRepositoryInstance) {
        this.courseRepository = courseRepository;
    }

    public async getDirectory(manaboCourseId: string): Promise<ManaboDirectoryInfo> {
        return this.courseRepository.getClassDirectory(manaboCourseId);
    }
}

const assignmentServiceInstance = new IntegratedAssignmentService();
export default assignmentServiceInstance;
