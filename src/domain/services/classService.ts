import classRepositoryInstance, { ClassRepository } from "@/src/data/repositories/classRepository";
import { DataBuildError } from "../errors/serviceError";
import { AttendanceInfo, Class } from "../models/class";
import classUsecaseInstance, { ClassUsecase } from "../usecase/classUsecase";
import authServiceInstance, { AuthService } from "./authService";

export interface ClassService {
    /**
     * 授業の詳細情報を取得し、最新の授業情報へ更新します。
     * @param classData 更新対象の授業情報
     * @returns 取得した詳細を含む授業情報
     */
    updateClassDetails(classData: Class): Promise<Class>;
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

    public async updateClassDetails(classData: Class): Promise<Class> {
        try {
            // 出席情報の取得
            const attendanceLog = await this.getAttendance(classData.manaboClassId);

            // ニュースの取得
            const news = await this.classRepository.getClassNews(this.authService.shibAuth, classData.manaboClassId);

            // シラバスの取得
            const detail = await this.classRepository.getClassSyllabus(
                this.authService.shibAuth,
                classData.manaboClassId
            );

            return {
                ...classData,
                attendanceLog,
                news,
                detail,
            };
        } catch (error) {
            console.error("Failed to update class details:", error);
            throw new DataBuildError({ cause: error });
        }
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
