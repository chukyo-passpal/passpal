import newsRepositoryInstance, { NewsRepository } from "@/src/data/repositories/newsRepository";
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
    constructor(newsRepository = newsRepositoryInstance) {
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

const newsServiceInstance = new IntegratedNewsService();
export default newsServiceInstance;
