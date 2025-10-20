import { TimetableRepository } from "@/src/data/repositories/timetableRepository";
import { Campus } from "../constants/chukyo-univ";
import { Period } from "../constants/period";
import { Weekday } from "../constants/week";
import { PeriodData, TimetableData } from "../models/timetable";

// 時間割の時限情報を生成するヘルパー関数 PeriodTimeの略。
function pt(time: string): Date {
    return new Date(`1970-01-01T${time}:00+09:00`);
}

export class TimetableService {
    private readonly timetableRepository: TimetableRepository;

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
    public get periodData(): PeriodData {
        return this._periodData;
    }

    constructor(timetableRepository: TimetableRepository = new TimetableRepository()) {
        this.timetableRepository = timetableRepository;
    }

    public async getTimetable(): Promise<TimetableData> {
        const manaboTimetable = await this.timetableRepository.getManaboTimetable();
        const cubicsTimetable = await this.timetableRepository.getCubicsTimetable();

        // マナボとキュービックスの時間割をマージするロジックをここに実装
        const mergedTimetable = this.mergeTimetables(manaboTimetable, cubicsTimetable);

        return mergedTimetable;
    }

    public getShouldDisplayWeekdays(Timetable: TimetableData): Weekday[] {
        const shouldDisplay: Weekday[] = ["月", "火", "水", "木", "金"];

        const isSaturdayUsed = Object.values(Timetable.timetable["土"]).some((entry) => entry !== null);
        const isSundayUsed = Object.values(Timetable.timetable["日"]).some((entry) => entry !== null);

        if (isSundayUsed) {
            shouldDisplay.push("土");
            shouldDisplay.push("日");
        } else if (isSaturdayUsed) {
            shouldDisplay.push("土");
        }

        return shouldDisplay;
    }

    public getShouldDisplayPeriods(timetable: TimetableData, campus: Campus): Period[] {
        // TODO: ちゃんと実装する
        return ["1", "2", "3", "4", "5"];
    }

    private mergeTimetables(manabo: TimetableData, cubics: TimetableData): TimetableData {
        const mergedTimetable: TimetableData["timetable"] = { ...manabo.timetable };

        for (const day of Object.keys(mergedTimetable) as (keyof typeof mergedTimetable)[]) {
            for (const period of Object.keys(mergedTimetable[day]) as (keyof (typeof mergedTimetable)[typeof day])[]) {
                if (mergedTimetable[day][period] !== null) {
                    const cubicsEntry = cubics.timetable[day][period];
                    mergedTimetable[day][period].cubicsCourseId = cubicsEntry?.cubicsCourseId || "";
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

const timetableServiceInstance = new TimetableService();
export default timetableServiceInstance;
