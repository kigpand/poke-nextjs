import { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";

export function useCurrentPokemon() {
  const { currentPoke, setCurrentList, resetCurrentList } = usePokemonStore();

  function handleAddCurrentList(list: IPokemon[]) {
    setCurrentList(list);
  }

  return { currentPoke, handleAddCurrentList, resetCurrentList };
}
