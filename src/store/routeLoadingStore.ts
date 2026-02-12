import { create } from "zustand";

type RouteLoadingState = {
  isNavigating: boolean;
  setNavigating: (value: boolean) => void;
};

export const useRouteLoadingStore = create<RouteLoadingState>((set) => ({
  isNavigating: false,
  setNavigating: (value) => set({ isNavigating: value }),
}));
