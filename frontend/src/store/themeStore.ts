import { create } from 'zustand'

interface ThemeState {
    theme: boolean
    changeTheme: (by: boolean) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
    theme: localStorage.getItem("theme") === "light" ? true : false,
    changeTheme: (by) => set((state) => ({ theme: by })),
}))
