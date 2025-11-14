import { Campus } from "../constants/chukyo-univ";
import { Period } from "../constants/period";
import { Weekday } from "../constants/week";
import { TimetableData } from "../models/timetable";

export interface TimetableUsecase {
    /**
     * 時間割に基づいて表示すべき曜日を算出します。
     * @param timetable 判定対象の時間割
     * @returns 表示対象の曜日配列
     */
    getShouldDisplayWeekdays(timetable: TimetableData): Weekday[];

    /**
     * 表示すべき時限を算出します。
     * @param timetable 判定対象の時間割
     * @param campus 対象キャンパス
     * @returns 表示する時限リスト
     */
    getShouldDisplayPeriods(timetable: TimetableData, campus: Campus): Period[];
}

export class IntegratedTimetableUsecase implements TimetableUsecase {
    public getShouldDisplayWeekdays(timetable: TimetableData): Weekday[] {
        const shouldDisplay: Weekday[] = ["月", "火", "水", "木", "金"];

        const isSaturdayUsed = Object.values(timetable.timetable["土"]).some((entry) => entry !== null);
        const isSundayUsed = Object.values(timetable.timetable["日"]).some((entry) => entry !== null);

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
}

const timetableUsecaseInstance = new IntegratedTimetableUsecase();
export default timetableUsecaseInstance;
