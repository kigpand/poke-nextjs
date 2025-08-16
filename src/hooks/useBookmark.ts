import { IPokemon } from "@/interface/IPokemon";
import { useBookmarkStore } from "@/store/bookmarkStore";

/**
 * 도감용 훅
 */
export function useBookmark() {
  const { bookmarkList, addBookmarkItem, removeBookmarkItem, clearBookmark } =
    useBookmarkStore();

  function addBookmark(pokeItem: IPokemon, callback: Function) {
    const result = bookmarkList.find(
      (pokeList: IPokemon) => pokeList.id === pokeItem.id
    );
    if (result) {
      alert("이미 도감에 등록된 포켓몬입니다.");
      return;
    }
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
