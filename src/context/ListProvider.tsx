"use client";

import { IPokemon } from "@/interface/IPokemon";
import { createContext } from "react";

export const ListContext = createContext<IPokemon[] | null>(null);

type Props = {
  pokemonList: IPokemon[];
  children: React.ReactNode;
};

export default function ListProvider({ pokemonList, children }: Props) {
  return (
    <ListContext.Provider value={pokemonList}>{children}</ListContext.Provider>
  );
}
