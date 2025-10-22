import { CourseData, CourseInfo } from "@/src/domain/models/course";
import { TimetableData } from "@/src/domain/models/timetable";
import courseServiceInstance, { CourseService } from "@/src/domain/services/courseService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface CourseState {
    lastFetch: Date | null;
    courseData: CourseData | null;
    loading: boolean;

    courseService: CourseService;

    clear: () => void;
    setFromTimetable: (timetableData: TimetableData) => TimetableData;
    refetchCourseInfo: (manaboCourseId: string) => Promise<CourseInfo>;
}

/**
 * 授業関連の状態を保持するZustandストアを提供します。
 */
const useCourse = create<CourseState>()(
    persist(
        immer((set, get) => ({
            lastFetch: null,
            courseData: null,
            loading: false,

            courseService: courseServiceInstance,

            /**
             * 保存している授業データをリセットします。
             */
            clear: () =>
                set((state) => {
                    state.courseData = null;
                }),

            /**
             * 時間割データから授業情報を構築し、ストアに保存します。
             * @param timetableData 時間割データ
             * @returns 渡された時間割データ
             */
            setFromTimetable: (timetableData: TimetableData) => {
                set((state) => {
                    state.courseData = get().courseService.buildCourseInfoFromTimetable(timetableData);
                });
                return timetableData;
            },

            /**
             * 指定した授業の詳細情報を再取得します。
             * @param manaboCourseId Manaboの授業ID
             * @returns 更新された授業情報
             */
            refetchCourseInfo: async (manaboCourseId: string) => {
                const nowCourseData = get().courseData;
                if (!nowCourseData) {
                    throw new Error("Course data is not set.");
                }
                set((state) => {
                    state.loading = true;
                });
                try {
                    const courseData = await get().courseService.updateCourseInfo(nowCourseData.courses[manaboCourseId]);
                    set((state) => {
                        if (state.courseData) {
                            state.courseData.courses[manaboCourseId] = courseData;
                            state.loading = false;
                            state.lastFetch = new Date();
                        }
                    });
                    return courseData;
                } catch (err) {
                    set((state) => {
                        state.loading = false;
                    });
                    throw err;
                }
            },
        })),
        {
            name: "course-storage",
            version: 0,
            partialize: (state) => ({
                lastFetch: state.lastFetch,
                courseData: state.courseData,
            }),
            storage: createJSONStorage(() => AsyncStorage),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                // version 0 からのマイグレーション例:
                // if (version === 0) {
                //     persistedState.newField = defaultValue;
                // }
                return persistedState as CourseState;
            },
        }
    )
);

export default useCourse;
