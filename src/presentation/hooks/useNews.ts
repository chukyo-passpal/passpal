// /**
//  * News フック
//  * UI向けのニュースデータ取得フック
//  */

// import type { NewsData } from "@/types/news";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";
// import { AlboNewsRepository } from "../repositories/newsRepository";
// import { NewsService } from "../services/newsService";

// const newsRepository = new AlboNewsRepository();
// const newsService = new NewsService(newsRepository);

// export interface NewsState {
//     lastFetch: Date | null;
//     newsData: NewsData | null;
//     loading: boolean;
//     error: Error | null;
//     setNewsData: (newsData: NewsData | null) => void;
//     refetch: (service?: NewsService) => Promise<void>;
// }

// const useNews = create<NewsState>()(
//     persist(
//         immer((set) => ({
//             lastFetch: null,
//             newsData: null,
//             loading: false,
//             error: null,

//             setNewsData: (newsData: NewsData | null) =>
//                 set((state) => {
//                     state.newsData = newsData;
//                 }),

//             refetch: async (service: NewsService = newsService) => {
//                 set((state) => {
//                     state.loading = true;
//                     state.error = null;
//                 });

//                 try {
//                     const data = await service.fetchAllNews();
//                     set((state) => {
//                         state.newsData = data;
//                         state.loading = false;
//                         state.lastFetch = new Date();
//                     });
//                 } catch (err) {
//                     set((state) => {
//                         state.error = err instanceof Error ? err : new Error("Unknown error");
//                         state.loading = false;
//                     });
//                 }
//             },
//         })),
//         {
//             name: "news-storage",
//             version: 0,
//             partialize: (state) => ({
//                 lastFetch: state.lastFetch,
//                 newsData: state.newsData,
//             }),
//             storage: createJSONStorage(() => AsyncStorage),
//             migrate: (persistedState: any, version: number) => {
//                 // 将来的なマイグレーション処理
//                 // version 0 からのマイグレーション例:
//                 // if (version === 0) {
//                 //     persistedState.newField = defaultValue;
//                 // }
//                 return persistedState as NewsState;
//             },
//         }
//     )
// );

// export default useNews;
