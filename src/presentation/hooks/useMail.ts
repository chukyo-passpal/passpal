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
    clear: () => void;
    refetch: (page?: number, service?: MailService) => Promise<MailData>;
}

const useMail = create<MailState>()(
    persist(
        immer((set) => ({
            lastFetch: null,
            mailData: null,
            loading: false,

            clear: () =>
                set((state) => {
                    state.mailData = null;
                }),

            refetch: async (page: number = 1, service: MailService = mailServiceInstance) => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const data = await service.getMails(page);
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
            storage: createJSONStorage(() => AsyncStorage),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                return persistedState as MailState;
            },
        }
    )
);

export default useMail;
