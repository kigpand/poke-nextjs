import { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";

export function usePokemonList() {
  const { pokemonList, setPokemonList } = usePokemonStore();

  function handlePokemonList(list: IPokemon[]) {
    setPokemonList(list);
  }

  return { pokemonList, handlePokemonList };
}
