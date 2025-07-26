"use client";

import { cn } from "@/lib/utils";
import {
  convertPokeData,
  getColor,
  getTypeConvertData,
  getTypeKo,
} from "@/utils/converter";
import { useCurrentPokemonList, usePokemonList } from "@/hooks";
import pokemonList from "@/json/pokemonList.json";

type Props = {
  title: string;
  list: string[];
  type: "type" | "gene";
  handleCloseButton: () => void;
};

export function SortButtons({ title, list, type, handleCloseButton }: Props) {
  const { handlePokemonList } = usePokemonList();
  const { handleChangeCurrentPokeList } = useCurrentPokemonList();

  const onSort = (sortData: string, type: string) => {
    let filteredData = [];
    if (type === "type") {
      filteredData = pokemonList.filter((poke) => {
        const result = getTypeConvertData(poke.pokeTypes)?.find(
          (type) => type === sortData
        );
        return result ? true : false;
      });
    } else {
      filteredData = pokemonList.filter((poke) => poke.generate === sortData);
    }

    if (filteredData?.length > 0) {
      const setting = convertPokeData(filteredData);
      handlePokemonList(setting);
      handleChangeCurrentPokeList(setting.slice(0, 20));
    }

    handleCloseButton();
  };

  const list_style =
    "p-1 text-center text-xs bg-white border cursor-pointer hover:font-bold ";

  return (
    <div className="w-full">
      <label className="w-full font-bold text-foreground">{title}</label>
      <ul className="w-full grid [grid-template-columns:repeat(2,49%)] gap-1 justify-evenly pb-2">
        {type === "type" &&
          list &&
          list.map((type: string, i: number) => {
            return (
              <li
                role="button"
                className={list_style}
                style={{
                  borderColor: getColor(type),
                  color: getColor(type),
                }}
                key={i}
                onClick={() => onSort(type, "type")}
              >
                {getTypeKo(type)}
              </li>
            );
          })}
        {type === "gene" &&
          list &&
          list.map((gene: string, i: number) => {
            return (
              <li
                role="button"
                className={cn(list_style, "text-black border-gray-300")}
                key={i}
                onClick={() => onSort(gene, "gene")}
              >
                {gene}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
