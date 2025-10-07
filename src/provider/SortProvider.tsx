"use client";

import type { IPokemon } from "@/interface/IPokemon";
import { createContext } from "react";

export const SortContext = createContext<IPokemon[] | null>(null);

type Props = {
  pokemonList: IPokemon[];
  children: React.ReactNode;
};

// 정렬 및 필터링용 provider. 원본 형식의 포켓몬 리스트를 context에 저장
export default function SortProvider({ pokemonList, children }: Props) {
  return (
    <SortContext.Provider value={pokemonList}>{children}</SortContext.Provider>
  );
}
