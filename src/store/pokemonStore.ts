import { IPokemon } from "@/interface/IPokemon";
import { create } from "zustand";

/**
 * 포켓몬리스트 store
 */
export const usePokemonStore = create<{
  pokemonList: IPokemon[];
  currentList: IPokemon[];
  setPokemonList: (list: IPokemon[]) => void;
  setCurrentList: (list: IPokemon[]) => void;
  addCurrentList: (list: IPokemon[]) => void;
}>((set, get) => ({
  pokemonList: [],
  currentList: [],
  setPokemonList: (pokemonList) => set({ pokemonList }),
  setCurrentList: (currentList) => set({ currentList }),
  addCurrentList: (list: IPokemon[]) => {
    set({ currentList: [...get().currentList, ...list] });
  },
}));
