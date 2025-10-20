import courseRepositoryInstance, { CourseRepository } from "@/src/data/repositories/courseRepository";
import { ManaboDirectoryInfo } from "../models/course";

export class AssignmentService {
    protected readonly courseRepository: CourseRepository;

    constructor(courseRepository = courseRepositoryInstance) {
        this.courseRepository = courseRepository;
    }

    public async getDirectory(manaboCourseId: string): Promise<ManaboDirectoryInfo> {
        return this.courseRepository.getClassDirectory(manaboCourseId);
    }
}

const assignmentServiceInstance = new AssignmentService();
export default assignmentServiceInstance;
