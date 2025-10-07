"use client";

import { useRef } from "react";
import type { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";
import { CURRENT_COUNT } from "@/constants/pokemonList";

type Props = {
  pokemonList: IPokemon[];
  children: React.ReactNode;
};

export default function StoreProvider({ pokemonList, children }: Props) {
  // StrictMode에서도 중복 초기화를 막기 위한 가드
  const seeded = useRef(false);

  if (!seeded.current) {
    usePokemonStore.setState({
      pokemonList,
      currentList: pokemonList.slice(0, CURRENT_COUNT),
    });
    seeded.current = true;
  }

  return <>{children}</>;
}
