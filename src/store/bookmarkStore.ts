import { IPokemon } from "@/interface/IPokemon";
import { create } from "zustand";

/**
 * 도감용 store
 */
export const useBookmarkStore = create<{
  bookmarkList: IPokemon[];
  addBookmarkItem: (item: IPokemon) => void;
  removeBookmarkItem: (item: IPokemon) => void;
  clearBookmark: () => void;
}>((set, get) => ({
  bookmarkList: [],
  addBookmarkItem: (item) => {
    const bookmarkList = get().bookmarkList;
    if (bookmarkList.length > 5) {
      bookmarkList.shift();
    }
    bookmarkList.push(item);
    set({ bookmarkList });
  },
  removeBookmarkItem: (item) =>
    set({
      bookmarkList: get().bookmarkList.filter((list) => list.id !== item.id),
    }),
  clearBookmark: () => {
    set({
      bookmarkList: [],
    });
  },
}));
