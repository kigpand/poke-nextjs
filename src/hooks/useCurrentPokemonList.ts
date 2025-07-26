import { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";

export function useCurrentPokemonList() {
  const { currentList, setCurrentList, addCurrentList, resetCurrentList } =
    usePokemonStore();

  function handleChangeCurrentPokeList(list: IPokemon[]) {
    setCurrentList(list);
  }

  function handleAddCurrentList(list: IPokemon[]) {
    addCurrentList(list);
  }

  return {
    currentList,
    handleChangeCurrentPokeList,
    handleAddCurrentList,
    resetCurrentList,
  };
}
