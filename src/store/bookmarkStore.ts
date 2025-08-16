import { MAX_CAPACITY } from "@/constants/book";
import { IPokemon } from "@/interface/IPokemon";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BookmarkStoreType = {
  bookmarkList: IPokemon[];
  addBookmarkItem: (item: IPokemon) => void;
  removeBookmarkItem: (item: IPokemon) => void;
  clearBookmark: () => void;
};

/**
 * 도감용 store
 */
export const useBookmarkStore = create<BookmarkStoreType>()(
  persist<BookmarkStoreType>(
    (set, get) => ({
      bookmarkList: [],
      addBookmarkItem: (item) =>
        set((state) => {
          if (state.bookmarkList.some((p) => p.id === item.id)) return state;
          const next = [...state.bookmarkList, item];
          return {
            bookmarkList:
              next.length > MAX_CAPACITY ? next.slice(-MAX_CAPACITY) : next,
          };
        }),
      removeBookmarkItem: (item) =>
        set((state) => ({
          bookmarkList: state.bookmarkList.filter((p) => p.id !== item.id),
        })),
      clearBookmark: () => set({ bookmarkList: [] }),
    }),
    {
      name: "bookmark-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
