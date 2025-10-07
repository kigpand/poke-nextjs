"use client";

import { useRef } from "react";
import type { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";

type Props = {
  pokemonList: IPokemon[];
  children: React.ReactNode;
};

// list용 provder. 포켓몬 리스트 표출용.
export default function ListProvider({ pokemonList, children }: Props) {
  // StrictMode에서도 중복 초기화를 막기 위한 가드
  const seeded = useRef(false);

  if (!seeded.current) {
    usePokemonStore.setState({
      pokemonList,
    });
    seeded.current = true;
  }

  return <>{children}</>;
}
