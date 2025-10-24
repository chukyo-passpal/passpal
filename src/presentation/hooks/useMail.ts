import { MailData } from "@/src/domain/models/mail";
import mailServiceInstance, { MailService } from "@/src/domain/services/mailService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface MailState {
    lastFetch: Date | null;
    mailData: MailData | null;
    loading: boolean;

    mailService: MailService;

    clear: () => void;
    refetch: (page?: number) => Promise<MailData>;
}

/**
 * メールデータを保持・取得するZustandストアを提供します。
 */
const useMail = create<MailState>()(
    persist(
        immer((set, get) => ({
            lastFetch: null,
            mailData: null,
            loading: false,

            mailService: mailServiceInstance,

            /**
             * 保存しているメールデータを初期化します。
             */
            clear: () =>
                set((state) => {
                    state.mailData = null;
                }),

            /**
             * 指定ページのメール一覧を取得します。
             * @param page 取得するページ番号（初期値は1）
             * @returns 最新のメールデータ
             */
            refetch: async (page: number = 1) => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const data = await get().mailService.getMails(page);
                    set((state) => {
                        state.mailData = data;
                        state.loading = false;
                        state.lastFetch = new Date();
                    });
                    return data;
                } catch (err) {
                    set((state) => {
                        state.loading = false;
                    });

                    throw err;
                }
            },
        })),
        {
            name: "mail-storage",
            version: 0,
            partialize: (state) => ({
                lastFetch: state.lastFetch,
                mailData: state.mailData,
            }),
            storage: createJSONStorage(() => AsyncStorage, {
                replacer: (key, value) => {
                    // DateをISO文字列に変換して保存
                    if (value instanceof Date) {
                        return value.toISOString();
                    }
                    return value;
                },
                reviver: (key, value) => {
                    // ISO文字列をDateに変換して復元
                    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
                        return new Date(value);
                    }
                    return value;
                },
            }),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                return persistedState as MailState;
            },
        }
    )
);

export default useMail;
