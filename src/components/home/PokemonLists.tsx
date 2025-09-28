"use client";

import { useCurrentPokemonList, usePokemonList } from "@/hooks";
import { forwardRef, useMemo } from "react";
import { VirtuosoGrid, GridComponents } from "react-virtuoso";
import { PokemonBox } from "../common";

const gridComponents = {
  List: forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
    ({ children, className, ...props }, ref) => (
      <ul
        ref={ref}
        {...props}
        className={`${className ?? ""} w-[100%] pokemon-grid gap-2`}
      >
        {children}
      </ul>
    )
  ),
};

const PAGE_COUNT = 9;

export default function MiniGridTest() {
  const { pokemonList } = usePokemonList();
  const { currentList, handleAddCurrentList } = useCurrentPokemonList();

  const canLoadMore = useMemo(
    () => currentList.length < pokemonList.length,
    [currentList.length, pokemonList.length]
  );

  const loadMore = () => {
    if (!canLoadMore) return;
    const count = currentList.length;
    const next = pokemonList.slice(count, count + PAGE_COUNT);
    if (next.length > 0) handleAddCurrentList(next);
  };

  return (
    <div className="w-[100%] h-[80vh]">
      <VirtuosoGrid
        data={currentList}
        overscan={200}
        endReached={loadMore}
        components={gridComponents as GridComponents}
        itemContent={(_, item) => <PokemonBox pokemon={item} />}
      />
    </div>
  );
}
