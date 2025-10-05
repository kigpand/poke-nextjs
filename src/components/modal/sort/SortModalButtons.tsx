"use client";

import { cn } from "@/lib/utils";
import { getColor, getTypeKo } from "@/utils/converter";
import { useCurrentPokemonList, usePokemonList } from "@/hooks";
import type { IPokemon } from "@/interface/IPokemon";

type Props = {
  resetList: IPokemon[];
  title: string;
  list: string[];
  type: "type" | "gene";
  handleCloseButton: () => void;
};

export function SortModalButtons({
  resetList,
  title,
  list,
  type,
  handleCloseButton,
}: Props) {
  const { handlePokemonList } = usePokemonList();
  const { handleChangeCurrentPokeList } = useCurrentPokemonList();

  const onSort = (sortData: string, type: string) => {
    let filteredData = [];
    if (type === "type") {
      filteredData = resetList.filter((poke: IPokemon) => {
        const result = poke.types?.find((type) => type === sortData);
        return result ? true : false;
      });
    } else {
      filteredData = resetList.filter(
        (poke: IPokemon) => poke.generate === sortData
      );
    }

    if (filteredData?.length > 0) {
      handlePokemonList(filteredData);
      handleChangeCurrentPokeList(filteredData.slice(0, 20));
    }

    handleCloseButton();
  };

  const list_style =
    "p-1 text-center text-xs bg-white border cursor-pointer w-full hover:font-bold ";

  return (
    <div className="w-full">
      <label className="w-full font-bold text-foreground">{title}</label>
      <ul className="w-full grid [grid-template-columns:repeat(2,49%)] gap-1 justify-evenly pb-2">
        {type === "type" &&
          list.map((type: string, i: number) => {
            return (
              <li key={i}>
                <button
                  className={list_style}
                  style={{
                    borderColor: getColor(type),
                    color: getColor(type),
                  }}
                  onClick={() => onSort(type, "type")}
                  aria-label={`${getTypeKo(type)} 타입으로 필터`}
                >
                  {getTypeKo(type)}
                </button>
              </li>
            );
          })}
        {type === "gene" &&
          list.map((gene: string, i: number) => {
            return (
              <li key={i}>
                <button
                  className={cn(list_style, "text-black border-gray-300")}
                  onClick={() => onSort(gene, "gene")}
                  aria-label={`${gene} 세대로 필터`}
                >
                  {gene}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
