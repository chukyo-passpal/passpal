/**
 * Course フック
 * UI向けの授業データ取得フック
 */

import { CourseData, CourseDetailInfo, CourseInfo } from "@/types/course";
import { TimetableData } from "@/types/timetable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { courseService, CourseService } from "../services/courseService";

export interface CourseState {
    lastFetch: Date | null;
    courseData: CourseData | null;
    loading: boolean;
    setCourseData: (courseData: CourseData | null) => void;
    fetchCourseInfo: (manaboCourseId: string, cubicsCourseId: string, service?: CourseService) => Promise<CourseInfo>;
    fetchSyllabusDetail: (manaboCourseId: string, service?: CourseService) => Promise<CourseDetailInfo>;
    setFromTimetable: (timetableData: TimetableData) => void;
    getCourseById: (manaboCourseId: string) => CourseData["courses"][string] | null;
}

const useCourse = create<CourseState>()(
    persist(
        immer((set, get) => ({
            lastFetch: null,
            courseData: null,
            loading: false,

            setCourseData: (courseData: CourseData | null) =>
                set((state) => {
                    state.courseData = courseData;
                }),

            fetchCourseInfo: async (manaboCourseId: string, cubicsCourseId: string, service: CourseService = courseService) => {
                set((state) => {
                    state.loading = true;
                });

                const courseData = await service.getCourseInfo(manaboCourseId, cubicsCourseId);
                set((state) => {
                    if (state.courseData) {
                        state.courseData.courses[manaboCourseId] = courseData;
                    }
                    state.loading = false;
                    state.lastFetch = new Date();
                });
                return courseData;
            },

            fetchSyllabusDetail: async (manaboCourseId: string, service: CourseService = courseService) => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const syllabusDetail: CourseDetailInfo = await service.getSyllabusDetail(manaboCourseId);

                    set((state) => {
                        if (state.courseData && state.courseData.courses[manaboCourseId]) {
                            // 既存の授業情報にシラバス詳細を追加
                            state.courseData.courses[manaboCourseId].detail = syllabusDetail;
                        }
                        state.loading = false;
                        state.lastFetch = new Date();
                    });

                    return syllabusDetail;
                } catch (error) {
                    set((state) => {
                        state.loading = false;
                    });
                    throw error;
                }
            },

            setFromTimetable: (timetableData: TimetableData) =>
                set((state) => {
                    state.courseData = courseService.buildCourseInfoFromTimetable(timetableData);
                }),

            /**
             * manaboCourseIdから授業データを取得
             */
            getCourseById: (manaboCourseId: string) => {
                const state = get();
                if (!state.courseData) return null;
                return state.courseData.courses[manaboCourseId] || null;
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
