import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import { cubicsTimetableToDomain, manaboTimetableToDomain } from "../mappers/timetableMapper";
import cubicsProviderInstance, { CubicsProvider } from "../providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export class TimetableRepository {
    private readonly manaboProvider: ManaboProvider;
    private readonly cubicsProvider: CubicsProvider;

    constructor({
        manaboProvider = manaboProviderInstance,
        cubicsProvider = cubicsProviderInstance,
    }: { manaboProvider?: ManaboProvider; cubicsProvider?: CubicsProvider } = {}) {
        this.manaboProvider = manaboProvider;
        this.cubicsProvider = cubicsProvider;
    }

    // マナボ時間割取得
    public async getManaboTimetable() {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                action: "glexa_ajax_timetable_view",
            })
        );

        const dto = parser.parseManaboTimetable(response);
        if (dto.success) {
            return manaboTimetableToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // キュービックス時間割取得
    public async getCubicsTimetable() {
        const response = await this.cubicsProvider.get("/unias/UnSSOLoginControl2?REQ_ACTION_DO=/ARF010.do&REQ_PRFR_MNU_ID=MNUIDSTD0103");

        const dto = parser.parseCubicsAsTimetable(response);
        if (dto.success) {
            return cubicsTimetableToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }
}

const timetableRepositoryInstance = new TimetableRepository();
export default timetableRepositoryInstance;
