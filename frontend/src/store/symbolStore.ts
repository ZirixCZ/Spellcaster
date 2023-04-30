import { create } from "zustand";
import { getSymbol } from "../utils/symbol";

interface SymbolState {
  symbol: string;
  changeSymbol: (pathname: string | undefined) => void;
}

export const useSymbolStore = create<SymbolState>()((set) => ({
  symbol: "err",
  changeSymbol: (pathname) => set(() => ({ symbol: getSymbol(pathname) })),
}));
