import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import "@/src/data/repositories/newsRepository";
import type { NewsRepository } from "@/src/data/repositories/newsRepository";
import { NewsData } from "../models/news";

export interface NewsService {
    /**
     * ニュース情報を取得し、ドメインモデルへまとめます。
     * @returns ニュースデータ
     */
    getNews(): Promise<NewsData>;
}

export class IntegratedNewsService implements NewsService {
    protected readonly newsRepository: NewsRepository;

    /**
     * ニュースサービスを初期化します。
     * @param newsRepository ニュース取得に利用するリポジトリ
     */
    constructor(newsRepository: NewsRepository) {
        this.newsRepository = newsRepository;
    }

    public async getNews(): Promise<NewsData> {
        const alboNews = await this.newsRepository.getAlboNews();
        return {
            manaboNews: [],
            alboNews,
        };
    }
}

diContainer.registerSingleton(DI_TOKENS.newsService, (container) =>
    new IntegratedNewsService(container.resolve<NewsRepository>(DI_TOKENS.newsRepository))
);

const newsServiceInstance = diContainer.resolve<NewsService>(DI_TOKENS.newsService);
export default newsServiceInstance;
