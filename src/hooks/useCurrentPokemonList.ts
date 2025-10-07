import type { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";
import { usePokemonList } from "./usePokemonList";
import { CURRENT_COUNT } from "@/constants/pokemonList";

export function useCurrentPokemonList() {
  const { handlePokemonList } = usePokemonList();
  const { currentList, setCurrentList, addCurrentList } = usePokemonStore();

  function handleChangeCurrentPokeList(list: IPokemon[]) {
    setCurrentList(list);
  }

  function handleAddCurrentList(list: IPokemon[]) {
    addCurrentList(list);
  }

  async function handleResetCurrentList(reset: IPokemon[]) {
    setCurrentList(reset.slice(0, CURRENT_COUNT));
    handlePokemonList(reset);
  }

  return {
    currentList,
    handleChangeCurrentPokeList,
    handleAddCurrentList,
    handleResetCurrentList,
  };
}
