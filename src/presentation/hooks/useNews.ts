import { NewsData } from "@/src/domain/models/news";
import newsServiceInstance, { NewsService } from "@/src/domain/services/newsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface NewsState {
    lastFetch: Date | null;
    newsData: NewsData | null;
    loading: boolean;

    newsService: NewsService;

    clear: () => void;
    refetch: () => Promise<NewsData>;
}

/**
 * ニュース情報を保持・更新するZustandストアを提供します。
 */
const useNews = create<NewsState>()(
    persist(
        immer((set, get) => ({
            lastFetch: null,
            newsData: null,
            loading: false,

            newsService: newsServiceInstance,

            /**
             * 保存しているニュースの状態を初期化します。
             */
            clear: () =>
                set((state) => {
                    state.lastFetch = null;
                    state.newsData = null;
                }),

            /**
             * リモートからニュースを再取得します。
             * @returns 最新のニュースデータ
             */
            refetch: async () => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const news = await get().newsService.getNews();

                    set((state) => {
                        state.newsData = news;
                        state.loading = false;
                        state.lastFetch = new Date();
                    });

                    return news;
                } catch (err) {
                    set((state) => {
                        state.loading = false;
                    });
                    throw err;
                }
            },
        })),
        {
            name: "news-storage",
            version: 0,
            partialize: (state) => ({
                lastFetch: state.lastFetch,
                newsData: state.newsData,
            }),
            storage: createJSONStorage(() => AsyncStorage),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                // version 0 からのマイグレーション例:
                // if (version === 0) {
                //     persistedState.newField = defaultValue;
                // }
                return persistedState as NewsState;
            },
        }
    )
);

export default useNews;
