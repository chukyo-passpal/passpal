import { BusTimetable, BusTimetableCell } from "@/src/domain/services/busService";
import useSetting from "@/src/presentation/hooks/useSetting";

export interface BusUsecase {
    /**
     * 乗換案内サービスのURLを生成します。
     * @param time 出発時刻
     * @returns 乗換案内サービスのURL
     */
    getTrainInfoUrl(time: Date): string;

    /**
     * 経由地名を取得します。
     * @param via 経由地情報
     * @returns 経由地名
     */
    getViaName(via: { name: string; arrivalAt: Date }): string;

    /**
     * 次のバスのリストを取得します。
     * @param timetable バス時刻表
     * @param currentTime 現在時刻
     * @param isForward true: 浄水駅→大学, false: 大学→浄水駅
     * @returns 次のバスのリスト（最大5件）
     */
    getNextBuses(timetable: BusTimetable, currentTime: Date, isForward: boolean): BusTimetableCell[];

    /**
     * 次のバスまでの時間を取得します。
     * @param nextBuses 次のバスのリスト
     * @param currentTime 現在時刻
     * @returns 次のバスまでの時間（分、秒）。バスがない場合はnull
     */
    getTimeUntilNextBus(nextBuses: BusTimetableCell[], currentTime: Date): { minutes: number; seconds: number } | null;

    /**
     * 時刻を HH:MM 形式でフォーマットします。
     * @param date 日時
     * @returns フォーマットされた時刻
     */
    formatTime(date: Date): string;
}

export class IntegratedBusUsecase implements BusUsecase {
    public getTrainInfoUrl(time: Date): string {
        const departure = encodeURI("浄水駅");
        const destination = encodeURI(useSetting.getState().homeStation);
        const trainInfoService = useSetting.getState().trainInfoService;

        switch (trainInfoService) {
            case "google-map":
                // 参考: https://mstickles.wordpress.com/2015/06/12/gmaps-urls-intro/
                const departureTimestamp = time.getTime() / 1000 + 9 * 60 * 60; // JSTに変換
                return `https://www.google.com/maps/dir/${departure}/${destination}/data=!4m6!4m5!2m3!6e0!7e2!8j${departureTimestamp}!3e3`;
            case "yahoo-transit":
                return `https://transit.yahoo.co.jp/search/result?from=${departure}&to=${destination}&y=${time.getFullYear()}&m=${time.getMonth() + 1}&d=${time.getDate()}&hh=${time.getHours()}&m1=${Math.floor(time.getMinutes() / 10)}&m2=${time.getMinutes() % 10}&type=1`;
            case "jorudan":
                return `https://www.jorudan.co.jp/norikae/cgi/nori.cgi?eki1=${departure}&eki2=${destination}&Dyy=${time.getFullYear()}&Dmm=${time.getMonth() + 1}&Ddd=${time.getDate()}&Dhh=${time.getHours()}&Dmn1=${Math.floor(time.getMinutes() / 10)}&Dmn2=${time.getMinutes() % 10}&Cway=0&S=${encodeURI("検索")}`;
            case "navitime":
                return `https://www.navitime.co.jp/transfer/searchlist?orvStationName=${departure}&dnvStationName=${destination}&year=${time.getFullYear()}&month=${time.getMonth() + 1}&day=${time.getDate()}&hour=${time.getHours()}&minute=${time.getMinutes()}`;
        }
    }

    public getViaName(via: { name: string; arrivalAt: Date }): string {
        switch (via?.name) {
            case "kaidu":
                return "貝津";
            default:
                return via.name;
        }
    }

    public getTimeUntilNextBus(
        nextBuses: BusTimetableCell[],
        currentTime: Date
    ): { minutes: number; seconds: number } | null {
        if (nextBuses.length === 0 || !nextBuses[0]) return null;

        const diff = nextBuses[0].departureAt.getTime() - currentTime.getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return { minutes, seconds };
    }

    public formatTime(date: Date): string {
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }

    public getNextBuses(
        timetable: NonNullable<BusTimetable>,
        currentTime: Date,
        isForward: boolean
    ): BusTimetableCell[] {
        const now = currentTime;
        const maxTime = new Date(now.getTime() + 120 * 60 * 1000); // 120分後
        const buses = isForward ? timetable.forward : timetable.reverse;

        const nextBuses = buses
            .filter((cell) => cell.departureAt > now)
            .sort((a, b) => a.departureAt.getTime() - b.departureAt.getTime())
            .slice(0, 5);

        if (nextBuses[0] && nextBuses[0].departureAt > maxTime) {
            return [];
        }

        return nextBuses;
    }
}

const busUsecaseInstance = new IntegratedBusUsecase();
export default busUsecaseInstance;
