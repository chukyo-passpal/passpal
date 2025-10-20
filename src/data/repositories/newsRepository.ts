import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import { mapAlboNewsToDomain } from "../mappers/newsMapper";
import alboProviderInstance, { AlboProvider } from "../providers/chukyo-univ/alboProvider";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export class NewsRepository {
    private readonly manaboProvider: ManaboProvider;
    private readonly alboProvider: AlboProvider;

    constructor({
        manaboProvider = manaboProviderInstance,
        alboProvider = alboProviderInstance,
    }: { manaboProvider?: ManaboProvider; alboProvider?: AlboProvider } = {}) {
        this.manaboProvider = manaboProvider;
        this.alboProvider = alboProvider;
    }

    // マナボニュース取得
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

    // アルボニュース取得
    public async getAlboNews() {
        const response = await this.alboProvider.get("/uniprove_pt/portal/_ns:YXJldHJvLXN0dWRlbnQtMTAwMDN8ZDI_");
        const dto = parser.parseCubicsPtNews(response);
        if (dto.success) {
            return mapAlboNewsToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }
}

const newsRepositoryInstance = new NewsRepository();
export default newsRepositoryInstance;
