import type { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";
import { usePokemonList } from "./usePokemonList";

export function useCurrentPokemonList() {
  const { handlePokemonList } = usePokemonList();
  const { currentList, setCurrentList, addCurrentList } = usePokemonStore();

  function handleChangeCurrentPokeList(list: IPokemon[]) {
    setCurrentList(list);
  }

  function handleAddCurrentList(list: IPokemon[]) {
    addCurrentList(list);
  }

  async function handleResetCurrentList() {
    const response = await fetch("/api/reset");
    const data = await response.json();

    setCurrentList(data.slice(0, 20));
    handlePokemonList(data);
  }

  return {
    currentList,
    handleChangeCurrentPokeList,
    handleAddCurrentList,
    handleResetCurrentList,
  };
}
