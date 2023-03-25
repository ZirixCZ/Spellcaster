import { create } from "zustand";
import { getSymbol } from "../utils/symbol";

interface SymbolState {
  symbol: string;
  changeSymbol: () => void;
}

export const useSymbolStore = create<SymbolState>()((set) => ({
  symbol: "err",
  changeSymbol: () => set(() => ({ symbol: getSymbol() })),
}));
