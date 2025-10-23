import { AlboNewsInfo } from "@/src/domain/models/news";
import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import { alboNewsToDomain } from "../mappers/newsMapper";
import alboProviderInstance, { AlboProvider } from "../providers/chukyo-univ/alboProvider";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export interface NewsRepository {
    /**
     * Manaboから最新ニュース一覧を取得します。
     * @returns ニュース一覧の解析結果
     * @throws ParseError 解析に失敗した場合
     */
    getManaboNews(): Promise<parser.ManaboNewsDTO>;

    /**
     * Alboから最新ニュース一覧を取得します。
     * @returns ドメイン変換済みのニュース一覧
     * @throws ParseError 解析に失敗した場合
     */
    getAlboNews(): Promise<AlboNewsInfo[]>;
}

export class IntegratedNewsRepository implements NewsRepository {
    private readonly manaboProvider: ManaboProvider;
    private readonly alboProvider: AlboProvider;

    /**
     * リポジトリを初期化します。
     * @param manaboProvider Manaboプロバイダー
     * @param alboProvider Alboプロバイダー
     */
    constructor({
        manaboProvider = manaboProviderInstance,
        alboProvider = alboProviderInstance,
    }: { manaboProvider?: ManaboProvider; alboProvider?: AlboProvider } = {}) {
        this.manaboProvider = manaboProvider;
        this.alboProvider = alboProvider;
    }

    public async getManaboNews() {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                action: "glexa_ajax_news_list",
            })
        );
        const dto = parser.parseManaboNews(response);
        if (dto.success) {
            // TODO: domain形にmapする
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    public async getAlboNews() {
        const response = await this.alboProvider.get("/uniprove_pt/portal/_ns:YXJldHJvLXN0dWRlbnQtMTAwMDN8ZDI_");
        const dto = parser.parseCubicsPtNews(response);
        if (dto.success) {
            return alboNewsToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }
}

const newsRepositoryInstance = new IntegratedNewsRepository();
export default newsRepositoryInstance;
