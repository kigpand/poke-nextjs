import { IPokemon } from "@/interface/IPokemon";
import { create } from "zustand";
import pokemonList from "@/json/pokemonList.json";
import { convertPokeData } from "@/utils/converter";

/**
 * 포켓몬리스트 store
 */
export const usePokemonStore = create<{
  pokemonList: IPokemon[];
  currentPoke: IPokemon[];
  setPokemonList: (list: IPokemon[]) => void;
  setCurrentList: (item: IPokemon[]) => void;
  resetCurrentList: () => void;
}>((set, get) => ({
  pokemonList: convertPokeData(pokemonList),
  currentPoke: [],
  setPokemonList: (pokemonList) => set({ pokemonList }),
  setCurrentList: (list: IPokemon[]) => {
    set({ currentPoke: [...get().currentPoke, ...list] });
  },
  resetCurrentList: () => set({ currentPoke: [] }),
}));
