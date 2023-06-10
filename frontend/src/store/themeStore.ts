import { create } from "zustand";

interface ThemeState {
  theme: boolean;
  changeTheme: (by: boolean) => void;
}

const writeToLocalStorage = (theme: boolean) => {
  localStorage.setItem("theme", theme ? "light" : "dark");
  return theme;
};

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: localStorage.getItem("theme") === "light" ? true : false,
  changeTheme: (by) => set(() => ({ theme: writeToLocalStorage(by) })),
}));
