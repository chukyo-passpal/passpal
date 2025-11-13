import busRepositoryInstance, { BusRepository } from "@/src/data/repositories/busRepository";
import { CalenderDiagramType, SpecialDiagramType } from "@/src/data/types/busCalender";
import { TimetableBusDiagramType } from "@/src/data/types/busTimetable";
import useSetting from "@/src/presentation/hooks/useSetting";

export interface BusService {
    /**
     * 今日のダイヤ種別を取得します。
     * @returns 今日のダイヤ種別のPromise
     */
    getTodayDiagram: () => Promise<TimetableBusDiagramType>;

    /**
     * 指定したダイヤ種別の時刻表を取得します。
     * @param diagram ダイヤ種別
     * @returns 指定したダイヤ種別の時刻表のPromise
     */
    getTimetable: (diagram: TimetableBusDiagramType) => Promise<BusTimetable>;
}

export interface BusTimetableCell {
    departureAt: Date;
    arrivalAt: Date;
    via?: {
        name: string;
        arrivalAt: Date;
    };
    isTurnStart?: boolean;
}

export type BusTimetable = {
    forward: BusTimetableCell[];
    reverse: BusTimetableCell[];
} | null;

export class IntegratedBusService implements BusService {
    protected readonly busRepository: BusRepository;

    /**
     * コンストラクタ
     * @param busRepository バスリポジトリのインスタンス
     */
    constructor(busRepository = busRepositoryInstance) {
        this.busRepository = busRepository;
    }

    public getTrainInfoUrl(time: Date): string {
        const destination = useSetting.getState().homeStation;
        const trainInfoService = useSetting.getState().trainInfoService;

        switch (trainInfoService) {
            case "google-map":
                // TODO: 時刻指定に対応する
                return `https://www.google.com/maps/dir/?api=1&origin=浄水駅&destination=${destination}&travelmode=transit`;
            case "yahoo-transit":
                return ``; // TODO: あとでかく
        }
    }

    public async getTodayDiagram(): Promise<TimetableBusDiagramType> {
        const calendar = await this.busRepository.getDiagram();
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const yearData = calendar.calendar.find((y) => y.year === year);
        if (!yearData) {
            return "none";
        }
        const monthData = yearData.months.find((m) => m.month === month);
        if (!monthData) {
            return "none";
        }
        const dayData = monthData.days.find((d) => d.day === day);
        if (!dayData) {
            return "none";
        }

        return this.calenderDiagramToTimetableDiagram(dayData.diagram, dayData.special);
    }

    public async getTimetable(diagram: TimetableBusDiagramType): Promise<BusTimetable> {
        const timetable = await this.busRepository.getTimetable();
        const diagramData = timetable.timetable.find((d) => d.diagram === diagram);
        if (!diagramData) {
            return null;
        }

        let processedTimetable: BusTimetable = {
            forward: [],
            reverse: [],
        };

        timetable.timetable.forEach((d) => {
            if (d.diagram !== diagram) {
                return;
            }

            ["forward", "reverse"].forEach((direction) => {
                d[direction as "forward" | "reverse"].forEach((hourSchedule) => {
                    const hour = hourSchedule.hour;
                    hourSchedule.schedules.forEach((item) => {
                        // バスの運行時間を設定する
                        let elapsedMinutes: number;
                        if (direction === "forward") {
                            if (item.via === "kaidu") {
                                elapsedMinutes = 17;
                            } else {
                                elapsedMinutes = 15;
                            }
                        } else {
                            elapsedMinutes = 14;
                        }

                        const departureAt = new Date();
                        departureAt.setHours(hour, item.minute, 0, 0);
                        const arrivalAt = new Date(departureAt.getTime() + elapsedMinutes * 60 * 1000);
                        const cell: BusTimetableCell = {
                            departureAt,
                            arrivalAt,
                            isTurnStart: item.isTurnStart,
                        };
                        // 経由地がある場合は経由地の到着時間も計算する
                        if (item.via) {
                            const viaArrivalAt = new Date(departureAt.getTime() + (elapsedMinutes - 7) * 60 * 1000);
                            cell.via = {
                                name: item.via,
                                arrivalAt: viaArrivalAt,
                            };
                        }

                        processedTimetable[direction as "forward" | "reverse"].push(cell);
                    });
                });
            });
        });

        return processedTimetable;
    }

    private calenderDiagramToTimetableDiagram(
        diagram: CalenderDiagramType,
        special: SpecialDiagramType
    ): TimetableBusDiagramType {
        switch (diagram) {
            case "A":
            case "B":
            case "C":
            case "A-dash":
            case "none":
                return diagram;
            case "special":
                if (special === "定期試験") {
                    return "定期試験";
                } else {
                    return "A";
                }
            default:
                return "none";
        }
    }
}

const busServiceInstance = new IntegratedBusService();
export default busServiceInstance;
