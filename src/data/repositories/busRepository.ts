import { ParseError } from "../errors/ParseError";
import palAPIProviderInstance from "../providers/palapi/palapiProvider";
import { ScheduleSchema, ScheduleType } from "../types/busCalender";
import { TimetableSchema, TimetableType } from "../types/busTimetable";

export interface BusRepository {
    /**
     * バスのダイヤカレンダーを取得します。
     * @returns バスダイヤカレンダーのPromise
     */
    getDiagram: () => Promise<ScheduleType>;

    /**
     * バスの時刻表を取得します。
     * @returns バス時刻表のPromise
     */
    getTimetable: () => Promise<TimetableType>;
}

export class IntegratedBusRepository implements BusRepository {
    private readonly palAPIProvider;

    constructor(palAPIProvider = palAPIProviderInstance) {
        this.palAPIProvider = palAPIProvider;
    }

    public async getDiagram(): Promise<ScheduleType> {
        const response = await this.palAPIProvider.get("/v1/document/school-bus-calendar");
        const json = JSON.parse(response);
        const parsed = ScheduleSchema.safeParse(json);
        if (parsed.success) {
            return parsed.data;
        } else {
            throw new ParseError({ cause: parsed.error });
        }
    }

    public async getTimetable(): Promise<TimetableType> {
        const response = await this.palAPIProvider.get("/v1/document/school-bus-timetable");
        const json = JSON.parse(response);
        const parsed = TimetableSchema.safeParse(json);
        if (parsed.success) {
            return parsed.data;
        } else {
            throw new ParseError({ cause: parsed.error });
        }
    }
}

const busRepositoryInstance = new IntegratedBusRepository();
export default busRepositoryInstance;
