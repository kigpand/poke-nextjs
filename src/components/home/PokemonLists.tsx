"use client";

import { usePokemonList } from "@/hooks";
import { forwardRef, useEffect, useRef } from "react";
import {
  VirtuosoGrid,
  GridComponents,
  VirtuosoGridHandle,
} from "react-virtuoso";
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

export default function PokemonLists() {
  const { pokemonList } = usePokemonList();
  const gridRef = useRef<VirtuosoGridHandle>(null);

  useEffect(() => {
    gridRef.current?.scrollToIndex({
      index: 0,
      align: "start",
      behavior: "auto",
    });
  }, [pokemonList]);

  return (
    <div className="w-[100%] h-[80vh]">
      <VirtuosoGrid
        ref={gridRef}
        data={pokemonList}
        overscan={200}
        components={gridComponents as GridComponents}
        itemContent={(_, item) => <PokemonBox pokemon={item} />}
      />
    </div>
  );
}
