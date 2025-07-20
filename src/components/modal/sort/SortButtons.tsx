import { useCallback } from "react";
import pokemonList from "@/json/pokemonList.json";
import {
  convertPokeData,
  getColor,
  getTypeConvertData,
  getTypeKo,
} from "@/utils/converter";
import { useCurrentPokemon, usePokemonList } from "@/hooks";
import { SortType } from "@/types/SortType";
import { IPokemon } from "@/interface/IPokemon";
import { cn } from "@/lib/utils";

type Props = {
  type: string;
  list?: string[];
  handleCloseButton: () => void;
};

export function SortButtons({ type, list, handleCloseButton }: Props) {
  const { handlePokemonList } = usePokemonList();
  const { handleChangeCurrentPoke } = useCurrentPokemon();

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
      handleChangeCurrentPoke(setting.slice(0, 20));
    }

    handleCloseButton();
  };

  const onSortBy = (type: SortType) => {
    const list: IPokemon[] = convertPokeData(
      JSON.parse(JSON.stringify(pokemonList))
    );
    let filteredData: IPokemon[] = list.sort((a, b) => b[type] - a[type]);

    if (filteredData?.length > 0) {
      handlePokemonList(filteredData);
      handleChangeCurrentPoke(filteredData.slice(0, 20));
    }

    handleCloseButton();
  };

  const onReverseSortBy = (type: SortType) => {
    const list: IPokemon[] = convertPokeData(
      JSON.parse(JSON.stringify(pokemonList))
    );
    const filteredData: IPokemon[] = list.sort((a, b) => a[type] - b[type]);

    if (filteredData?.length > 0) {
      handlePokemonList(filteredData);
      handleChangeCurrentPoke(filteredData.slice(0, 20));
    }

    handleCloseButton();
  };

  const list_style =
    "p-1 text-center text-xs bg-white border cursor-pointer hover:font-bold";

  return (
    <ul className="w-full grid [grid-template-columns:repeat(2,49%)] justify-evenly pb-2">
      {type === "type" &&
        list &&
        list.map((type: string, i: number) => {
          return (
            <li
              role="button"
              className={cn(
                list_style,
                `border-[${getColor(type)}] text-[${getColor(type)}]`
              )}
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
      {!list && (
        <li
          role="button"
          className={cn(list_style, "text-black border-gray-300")}
          onClick={() => onSortBy(type as SortType)}
        >
          높은 순
        </li>
      )}
      {!list && (
        <li
          role="button"
          className={cn(list_style, "text-black border-gray-300")}
          onClick={() => onReverseSortBy(type as SortType)}
        >
          낮은 순
        </li>
      )}
    </ul>
  );
}
