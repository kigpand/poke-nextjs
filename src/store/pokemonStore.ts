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
  setCurrentList: (list: IPokemon[]) => void;
  addCurrentList: (list: IPokemon[]) => void;
  resetCurrentList: () => void;
}>((set, get) => ({
  pokemonList: convertPokeData(pokemonList),
  currentPoke: convertPokeData(pokemonList).slice(0, 20),
  setPokemonList: (pokemonList) => set({ pokemonList }),
  setCurrentList: (currentPoke) => set({ currentPoke }),
  addCurrentList: (list: IPokemon[]) => {
    set({ currentPoke: [...get().currentPoke, ...list] });
  },
  resetCurrentList: () =>
    set({ currentPoke: convertPokeData(pokemonList).slice(0, 20) }),
}));
