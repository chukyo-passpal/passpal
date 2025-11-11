import newsRepositoryInstance, { NewsRepository } from "@/src/data/repositories/newsRepository";
import { NewsData } from "../models/news";
import authServiceInstance, { AuthService } from "./authService";

export interface NewsService {
    /**
     * ニュース情報を取得し、ドメインモデルへまとめます。
     * @returns ニュースデータ
     */
    getNews(): Promise<NewsData>;
}

export class IntegratedNewsService implements NewsService {
    protected readonly newsRepository: NewsRepository;
    protected readonly authService: AuthService;

    /**
     * ニュースサービスを初期化します。
     * @param newsRepository ニュース取得に利用するリポジトリ
     * @param authService 認証を処理するサービス
     */
    constructor(newsRepository = newsRepositoryInstance, authService = authServiceInstance) {
        this.newsRepository = newsRepository;
        this.authService = authService;
    }

    public async getNews(): Promise<NewsData> {
        const alboNews = await this.newsRepository.getAlboNews(this.authService.shibAuth);
        return {
            manaboNews: [],
            alboNews,
        };
    }
}

const newsServiceInstance = new IntegratedNewsService();
export default newsServiceInstance;
