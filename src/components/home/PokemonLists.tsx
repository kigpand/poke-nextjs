"use client";
import { useCurrentPokemonList, usePokemonList, useScroll } from "@/hooks";
import { PokemonBox } from "../common";
import { useEffect, useMemo } from "react";

const PAGE_COUNT = 9;

export default function PokemonLists() {
  const { scroll } = useScroll();
  const { pokemonList } = usePokemonList();
  const { currentList, handleAddCurrentList } = useCurrentPokemonList();

  // 더 이상 로드할 수없는 상황
  const canLoadMore = useMemo(
    () => currentList.length < pokemonList.length,
    [currentList.length, pokemonList.length]
  );

  useEffect(() => {
    if (scroll !== 0 && canLoadMore) {
      const count = currentList.length;
      handleAddCurrentList(pokemonList.slice(count, count + PAGE_COUNT));
    }
  }, [scroll, canLoadMore]);

  return (
    <ul role="list" className="pokemon-grid gap-2 w-[90%]">
      {currentList.map((poke) => {
        return <PokemonBox key={poke.id} pokemon={poke} />;
      })}
    </ul>
  );
}
