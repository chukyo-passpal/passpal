import useSetting from "@/src/presentation/hooks/useSetting";

export interface BusUsecase {
    /**
     * 乗換案内サービスのURLを生成します。
     * @param time 出発時刻
     * @returns 乗換案内サービスのURL
     */
    getTrainInfoUrl(time: Date): string;
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
}

const busUsecaseInstance = new IntegratedBusUsecase();
export default busUsecaseInstance;
