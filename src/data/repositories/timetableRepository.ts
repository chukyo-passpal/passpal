import * as parser from "@chukyo-passpal/web_parser";

import { TimetableData } from "@/src/domain/models/timetable";
import { shibbolethWebViewAuthFunction } from "../clients/chukyoShibboleth";
import { ParseError } from "../errors/ParseError";
import { cubicsTimetableToDomain, manaboTimetableToDomain } from "../mappers/timetableMapper";
import cubicsProviderInstance, { CubicsProvider } from "../providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export interface TimetableRepository {
    // マナボ時間割取得
    /**
     * Manaboから時間割を取得します。
     * @param authFunc shibboleth認証を行う関数
     * @returns ドメイン変換済みの時間割データ
     * @throws ParseError 解析に失敗した場合
     */
    getManaboTimetable(authFunc: shibbolethWebViewAuthFunction): Promise<TimetableData>;

    /**
     * Cubicsから時間割を取得します。
     * @param authFunc shibboleth認証を行う関数
     * @returns ドメイン変換済みの時間割データ
     * @throws ParseError 解析に失敗した場合
     */
    getCubicsTimetable(authFunc: shibbolethWebViewAuthFunction): Promise<TimetableData>;
}

export class IntegratedTimetableRepository implements TimetableRepository {
    private readonly manaboProvider: ManaboProvider;
    private readonly cubicsProvider: CubicsProvider;

    /**
     * リポジトリを初期化します。
     * @param manaboProvider Manaboプロバイダー
     * @param cubicsProvider Cubicsプロバイダー
     */
    constructor({
        manaboProvider = manaboProviderInstance,
        cubicsProvider = cubicsProviderInstance,
    }: { manaboProvider?: ManaboProvider; cubicsProvider?: CubicsProvider } = {}) {
        this.manaboProvider = manaboProvider;
        this.cubicsProvider = cubicsProvider;
    }

    /**
     * Manaboから時間割を取得します。
     * @returns ドメイン変換済みの時間割データ
     * @throws ParseError 解析に失敗した場合
     */
    public async getManaboTimetable(authFunc: shibbolethWebViewAuthFunction) {
        const response = await this.manaboProvider.post(
            authFunc,
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

    /**
     * Cubicsから時間割を取得します。
     * @returns ドメイン変換済みの時間割データ
     * @throws ParseError 解析に失敗した場合
     */
    public async getCubicsTimetable(authFunc: shibbolethWebViewAuthFunction) {
        const response = await this.cubicsProvider.get(
            authFunc,
            "/unias/UnSSOLoginControl2?REQ_ACTION_DO=/ARF010.do&REQ_PRFR_MNU_ID=MNUIDSTD0103"
        );

        const dto = parser.parseCubicsAsTimetable(response);
        if (dto.success) {
            return cubicsTimetableToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }
}

const timetableRepositoryInstance = new IntegratedTimetableRepository();
export default timetableRepositoryInstance;
