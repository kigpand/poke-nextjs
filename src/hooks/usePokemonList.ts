import type { IPokemon } from "@/interface/IPokemon";
import { usePokemonStore } from "@/store/pokemonStore";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function usePokemonList() {
  const { pokemonList } = usePokemonStore();
  const searchParams = useSearchParams();

  const filteredList = useMemo<IPokemon[]>(() => {
    if (!pokemonList || pokemonList.length === 0) return [];

    const sortTypeParam = searchParams.get("sortType");
    const sortingParam = searchParams.get("sorting");
    const typeParam = searchParams.get("type");
    const generateParam = searchParams.get("generate");
    const list = [...pokemonList];

    // info sorting
    if (sortTypeParam && sortingParam) {
      const sortKey = sortTypeParam as keyof IPokemon;

      list.sort((a, b) => {
        const sortA = a[sortKey] as number;
        const sortB = b[sortKey] as number;
        if (sortingParam === "desc") return sortB - sortA;
        return sortA - sortB;
      });

      return list;
    }

    // type filter
    if (typeParam) {
      const typeLower = typeParam.toLowerCase();

      return list.filter((poke: IPokemon) => {
        const result = poke.types?.find(
          (type) => type.toLowerCase() === typeLower
        );
        return result ? true : false;
      });
    }

    // generate filter
    if (generateParam) {
      return list.filter(
        (poke: IPokemon) => poke.generate === `${generateParam}세대`
      );
    }

    return list;
  }, [pokemonList, searchParams]);

  return { pokemonList, filteredList };
}
