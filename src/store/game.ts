import { create } from "zustand"

type HistoryType = {
  type: "movie" | "person"
  id: number
  number: number
}

type GameType = {
  endingFinish: HistoryType | null
  history: HistoryType[]
  addToHistory: (item: HistoryType) => void
  current: HistoryType | null
  setCurrent: (item: HistoryType) => void
}

const useGame = create<GameType>((set) => ({
  endingFinish: null,
  history: [],
  addToHistory: (item) =>
    set((state) => ({
      history: [...state.history, item],
    })),
  current: null,
  setCurrent: (item) => set(() => ({ current: item })),
}))

export { useGame }
