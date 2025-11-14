import timetableRepositoryInstance, { TimetableRepository } from "@/src/data/repositories/timetableRepository";
import { PeriodData, TimetableData } from "../models/timetable";
import authServiceInstance, { AuthService } from "./authService";

/**
 * 時間文字列から基準日のDateオブジェクトを生成します。
 * @param time `HH:MM`形式の時間文字列
 * @returns 指定時間のDateオブジェクト
 */
function pt(time: string): Date {
    return new Date(`1970-01-01T${time}:00+09:00`);
}

export interface TimetableService {
    periodData: PeriodData;

    /**
     * ManaboとCubicsの時間割を取得し、マージした結果を返します。
     * @returns マージ済みの時間割データ
     */
    getTimetable(): Promise<TimetableData>;
}

export class IntegratedTimetableService implements TimetableService {
    private readonly timetableRepository: TimetableRepository;
    private readonly authService: AuthService;

    private _periodData: PeriodData = {
        nagoya: {
            "1": { startTime: pt("09:00"), endTime: pt("10:30") },
            "2": { startTime: pt("10:45"), endTime: pt("12:15") },
            "3": { startTime: pt("13:10"), endTime: pt("14:40") },
            "4": { startTime: pt("14:55"), endTime: pt("16:25") },
            "5": { startTime: pt("16:40"), endTime: pt("18:10") },
            "6": null,
            "7": null,

            A: { startTime: pt("09:00"), endTime: pt("10:00") },
            B: { startTime: pt("10:10"), endTime: pt("11:10") },
            C: { startTime: pt("11:20"), endTime: pt("12:20") },
        },
        toyota: {
            "1": { startTime: pt("09:30"), endTime: pt("11:00") },
            "2": { startTime: pt("11:10"), endTime: pt("12:40") },
            "3": { startTime: pt("13:30"), endTime: pt("15:00") },
            "4": { startTime: pt("15:10"), endTime: pt("16:40") },
            "5": { startTime: pt("16:50"), endTime: pt("18:20") },
            "6": null,
            "7": null,
            A: null,
            B: null,
            C: null,
        },
    };
    /**
     * キャンパスごとの時限情報を返します。
     * @returns 時限データ
     */
    public get periodData(): PeriodData {
        return this._periodData;
    }

    /**
     * サービスを初期化し、時間割リポジトリを設定します。
     * @param timetableRepository 時間割取得に利用するリポジトリ
     * @param authService 認証を処理するサービス
     */
    constructor(timetableRepository = timetableRepositoryInstance, authService = authServiceInstance) {
        this.timetableRepository = timetableRepository;
        this.authService = authService;
    }

    public async getTimetable(): Promise<TimetableData> {
        const manaboTimetable = await this.timetableRepository.getManaboTimetable(this.authService.shibAuth);
        const cubicsTimetable = await this.timetableRepository.getCubicsTimetable(this.authService.shibAuth);

        // マナボとキュービックスの時間割をマージするロジックをここに実装
        const mergedTimetable = this.mergeTimetables(manaboTimetable, cubicsTimetable);

        return mergedTimetable;
    }

    /**
     * ManaboとCubicsの時間割データをマージします。
     * @param manabo Manabo由来の時間割
     * @param cubics Cubics由来の時間割
     * @returns 部室情報などを統合した時間割データ
     */
    private mergeTimetables(manabo: TimetableData, cubics: TimetableData): TimetableData {
        const mergedTimetable: TimetableData["timetable"] = { ...manabo.timetable };

        for (const day of Object.keys(mergedTimetable) as (keyof typeof mergedTimetable)[]) {
            for (const period of Object.keys(mergedTimetable[day]) as (keyof (typeof mergedTimetable)[typeof day])[]) {
                if (mergedTimetable[day][period] !== null) {
                    const cubicsEntry = cubics.timetable[day][period];
                    mergedTimetable[day][period].cubicsClassId = cubicsEntry?.cubicsClassId || "";
                    mergedTimetable[day][period].room = cubicsEntry?.room || "";
                }
            }
        }

        return {
            semester: manabo.semester,
            timetable: mergedTimetable,
        };
    }
}

const timetableServiceInstance = new IntegratedTimetableService();
export default timetableServiceInstance;
