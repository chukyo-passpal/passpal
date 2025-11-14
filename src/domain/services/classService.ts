import classRepositoryInstance, { ClassRepository } from "@/src/data/repositories/classRepository";
import { DataBuildError } from "../errors/serviceError";
import { AttendanceInfo, ClassInfo } from "../models/class";
import { TimetableData } from "../models/timetable";
import classUsecaseInstance, { ClassUsecase } from "../usecase/classUsecase";
import authServiceInstance, { AuthService } from "./authService";

export interface ClassService {
    /**
     * 授業の詳細情報を取得し、最新の授業情報へ更新します。
     * @param classInfo 更新対象の授業情報
     * @returns 取得した詳細を含む授業情報
     */
    updateClassInfo(classInfo: ClassInfo): Promise<ClassInfo>;

    /**
     * 新しく授業情報を取得し、構築します。
     */
    fetchAndBuildClassInfo(classId: string, timetable: TimetableData): Promise<ClassInfo>;
}

export class IntegratedClassService implements ClassService {
    protected readonly classRepository: ClassRepository;
    protected readonly authService: AuthService;
    protected readonly classUsecase: ClassUsecase;

    /**
     * 授業サービスを初期化します。
     * @param classRepository 授業関連データを扱うリポジトリ
     * @param authService 認証を処理するサービス
     * @param classUsecase 授業関連のUsecase
     */
    constructor(
        classRepository = classRepositoryInstance,
        authService = authServiceInstance,
        classUsecase = classUsecaseInstance
    ) {
        this.classRepository = classRepository;
        this.authService = authService;
        this.classUsecase = classUsecase;
    }

    public async updateClassInfo(classInfo: ClassInfo): Promise<ClassInfo> {
        const attendanceLog = await this.getAttendance(classInfo.info.manaboClassId);
        const news = await this.classRepository.getClassNews(this.authService.shibAuth, classInfo.info.manaboClassId);
        const detail = await this.classRepository.getClassSyllabus(
            this.authService.shibAuth,
            classInfo.info.manaboClassId
        );

        return {
            info: classInfo.info,
            attendanceLog,
            news,
            detail,
        };
    }

    public async fetchAndBuildClassInfo(classId: string, timetable: TimetableData): Promise<ClassInfo> {
        const classData = this.classUsecase.buildClassDataFromTimetable(timetable);
        const classInfo = classData.classes[classId];
        if (!classInfo) {
            throw new DataBuildError();
        }

        const info = classInfo.info;
        const attendanceLog = await this.getAttendance(classId);
        const news = await this.classRepository.getClassNews(this.authService.shibAuth, classId);
        const detail = await this.classRepository.getClassSyllabus(this.authService.shibAuth, classId);
        return {
            info,
            attendanceLog,
            news,
            detail,
        };
    }

    /**
     * 指定した授業の出席記録を取得します。
     * @param manaboClassId Manaboの授業ID
     * @returns 出席情報の配列
     */
    private async getAttendance(manaboClassId: string): Promise<AttendanceInfo[]> {
        // TODO: 将来的に手動での出席確認にも対応する
        return this.classRepository.getClassEntry(this.authService.shibAuth, manaboClassId);
    }
}

const classServiceInstance = new IntegratedClassService();
export default classServiceInstance;
