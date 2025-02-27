// import { create } from "zustand";
import { Course } from "../store/slices/player";
import { api } from "../api/axios";
import { useShallow } from "zustand/shallow";
import { createWithEqualityFn as create } from 'zustand/traditional'

interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
  load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: false, 

    load: async () => {
      set({isLoading: true})
      const response = await api.get("/courses/1")
      
      set({ 
        course: response.data,
        isLoading: false
      })
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex
      })
    },

    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex];
      const nextModuleIndex = currentModuleIndex + 1;
      const nextModule = course?.modules[nextModuleIndex]

      if(nextLesson) {
        set({currentLessonIndex: nextLessonIndex})
      } else {
        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0
          })
        }
      }
    },
  }
})

export const useCurrentLesson = () => {
  return useStore(useShallow(state => {
    const { currentModuleIndex, currentLessonIndex } = state

    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  }))
}