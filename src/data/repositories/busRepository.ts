import { ParseError } from "../errors/ParseError";
import cacheProviderInstance, { CacheProvider } from "../providers/cache/cacheProvider";
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
    private readonly cacheProvider;

    private static readonly ONE_DAY_MS = 24 * 60 * 60 * 1000;
    private static readonly TWO_DAYS_MS = IntegratedBusRepository.ONE_DAY_MS * 2;

    constructor(palAPIProvider = palAPIProviderInstance, cacheProvider: CacheProvider = cacheProviderInstance) {
        this.palAPIProvider = palAPIProvider;
        this.cacheProvider = cacheProvider;
    }

    public async getDiagram(): Promise<ScheduleType> {
        return await this.cacheProvider.fetchWithCache<ScheduleType>({
            key: "bus-diagram",
            fetcher: async () => {
                const response = await this.palAPIProvider.get("/v1/document/school-bus-calendar");
                const json = JSON.parse(response);
                const parsed = ScheduleSchema.safeParse(json);
                if (!parsed.success) {
                    throw new ParseError({ cause: parsed.error });
                }
                return parsed.data;
            },
            maxAgeMs: IntegratedBusRepository.ONE_DAY_MS,
            staleAgeMs: IntegratedBusRepository.TWO_DAYS_MS,
        });
    }

    public async getTimetable(): Promise<TimetableType> {
        return await this.cacheProvider.fetchWithCache<TimetableType>({
            key: "bus-timetable",
            fetcher: async () => {
                const response = await this.palAPIProvider.get("/v1/document/school-bus-timetable");
                const json = JSON.parse(response);
                const parsed = TimetableSchema.safeParse(json);
                if (!parsed.success) {
                    throw new ParseError({ cause: parsed.error });
                }
                return parsed.data;
            },
            maxAgeMs: IntegratedBusRepository.ONE_DAY_MS,
            staleAgeMs: IntegratedBusRepository.TWO_DAYS_MS,
        });
    }
}

const busRepositoryInstance = new IntegratedBusRepository();
export default busRepositoryInstance;
