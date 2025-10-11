import type { IPokemon } from "@/interface/IPokemon";
import { create } from "zustand";

/**
 * 포켓몬리스트 store
 */
export const usePokemonStore = create<{
  pokemonList: IPokemon[];
}>(() => ({
  pokemonList: [],
}));
