// // UI向けの唯一の入口。キャッシュ/ローディング/エラーを面倒見る

// import type { MailData } from "@/types/mail";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";
// import { MailRepository } from "../repositories/mailRepository";
// import { MailService } from "../services/mailService";

// const mailRepository = new MailRepository();
// const mailService = new MailService(mailRepository);

// export interface MailState {
//     lastFetch: Date | null;
//     mailData: MailData | null;
//     loading: boolean;
//     error: Error | null;
//     currentPage: number;
//     setMailData: (mailData: MailData | null) => void;
//     refetch: (page?: number, service?: MailService) => Promise<void>;
//     refetchUnread: (page?: number, service?: MailService) => Promise<void>;
// }

// const useMail = create<MailState>()(
//     persist(
//         immer((set) => ({
//             lastFetch: null,
//             mailData: null,
//             loading: false,
//             error: null,
//             currentPage: 1,

//             setMailData: (mailData: MailData | null) =>
//                 set((state) => {
//                     state.mailData = mailData;
//                 }),

//             refetch: async (page: number = 1, service: MailService = mailService) => {
//                 set((state) => {
//                     state.loading = true;
//                     state.error = null;
//                     state.currentPage = page;
//                 });

//                 try {
//                     const data = await service.getAllMails(page);
//                     set((state) => {
//                         state.mailData = data;
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

//             refetchUnread: async (page: number = 1, service: MailService = mailService) => {
//                 set((state) => {
//                     state.loading = true;
//                     state.error = null;
//                     state.currentPage = page;
//                 });

//                 try {
//                     const data = await service.getUnreadMails(page);
//                     set((state) => {
//                         state.mailData = data;
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
//             name: "mail-storage",
//             version: 0,
//             partialize: (state) => ({
//                 lastFetch: state.lastFetch,
//                 mailData: state.mailData,
//                 currentPage: state.currentPage,
//             }),
//             storage: createJSONStorage(() => AsyncStorage),
//             migrate: (persistedState: any, version: number) => {
//                 // 将来的なマイグレーション処理
//                 return persistedState as MailState;
//             },
//         }
//     )
// );

// export default useMail;
