import { IPokemon } from "@/interface/IPokemon";
import { useBookmarkStore } from "@/store/bookmarkStore";

/**
 * 도감용 훅
 */
export function useBookmark() {
  const { bookmarkList, addBookmarkItem, removeBookmarkItem, clearBookmark } =
    useBookmarkStore();

  function addBookmark(pokeItem: IPokemon, callback: Function) {
    addBookmarkItem(pokeItem);
    callback();
  }

  function findBookmark(poke: IPokemon) {
    return bookmarkList.some((list: IPokemon) => poke.id === list.id);
  }

  function removeBookmark(item: IPokemon) {
    removeBookmarkItem(item);
  }

  return {
    bookmarkList,
    addBookmark,
    findBookmark,
    removeBookmark,
    clearBookmark,
  };
}
