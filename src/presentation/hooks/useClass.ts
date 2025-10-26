import { ClassData, ClassInfo } from "@/src/domain/models/class";
import { TimetableData } from "@/src/domain/models/timetable";
import classServiceInstance, { ClassService } from "@/src/domain/services/classService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ClassState {
    lastFetch: Date | null;
    classData: ClassData | null;
    loading: boolean;

    classService: ClassService;

    clear: () => void;
    setFromTimetable: (timetableData: TimetableData) => TimetableData;
    refetchClassInfo: (manaboClassId: string) => Promise<ClassInfo>;
}

/**
 * 授業関連の状態を保持するZustandストアを提供します。
 */
const useClass = create<ClassState>()(
    persist(
        immer((set, get) => ({
            lastFetch: null,
            classData: null,
            loading: false,

            classService: classServiceInstance,

            /**
             * 保存している授業データをリセットします。
             */
            clear: () =>
                set((state) => {
                    state.classData = null;
                }),

            /**
             * 時間割データから授業情報を構築し、ストアに保存します。
             * @param timetableData 時間割データ
             * @returns 渡された時間割データ
             */
            setFromTimetable: (timetableData: TimetableData) => {
                set((state) => {
                    state.classData = get().classService.buildClassInfoFromTimetable(timetableData);
                });
                return timetableData;
            },

            /**
             * 指定した授業の詳細情報を再取得します。
             * @param manaboClassId Manaboの授業ID
             * @returns 更新された授業情報
             */
            refetchClassInfo: async (manaboClassId: string) => {
                const nowClassData = get().classData;
                if (!nowClassData) {
                    throw new Error("Class data is not set.");
                }
                set((state) => {
                    state.loading = true;
                });
                try {
                    const classData = await get().classService.updateClassInfo(nowClassData.classes[manaboClassId]);
                    set((state) => {
                        if (state.classData) {
                            state.classData.classes[manaboClassId] = classData;
                            state.loading = false;
                            state.lastFetch = new Date();
                        }
                    });
                    return classData;
                } catch (err) {
                    set((state) => {
                        state.loading = false;
                    });
                    throw err;
                }
            },
        })),
        {
            name: "class-storage",
            version: 0,
            partialize: (state) => ({
                lastFetch: state.lastFetch,
                classData: state.classData,
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
                // version 0 からのマイグレーション例:
                // if (version === 0) {
                //     persistedState.newField = defaultValue;
                // }
                return persistedState as ClassState;
            },
        }
    )
);

export default useClass;
