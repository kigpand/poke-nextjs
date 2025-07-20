import { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";

export function useCurrentPokemon() {
  const { currentPoke, setCurrentList, addCurrentList, resetCurrentList } =
    usePokemonStore();

  function handleChangeCurrentPoke(list: IPokemon[]) {
    setCurrentList(list);
  }

  function handleAddCurrentList(list: IPokemon[]) {
    addCurrentList(list);
  }

  return {
    currentPoke,
    handleChangeCurrentPoke,
    handleAddCurrentList,
    resetCurrentList,
  };
}
