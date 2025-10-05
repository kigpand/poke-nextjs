"use client";
import { SortType } from "@/types/SortType";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { convertPokeData } from "@/utils/converter";
import { IPokemon } from "@/interface/IPokemon";
import { useCurrentPokemonList, usePokemonList } from "@/hooks";

type Props = {
  handleCloseButton: () => void;
};

const SORT_LABELS: Record<SortType, string> = {
  id: "도감번호",
  weight: "무게",
  height: "키",
  hp: "HP",
  attack: "공격",
  defense: "방어",
  specialAttack: "특수공격",
  specialDefense: "특수방어",
  speed: "스피드",
  allStat: "총합",
};

export function SortSelect({ handleCloseButton }: Props) {
  const [select, setSelect] = useState<SortType>("id");
  const { handlePokemonList } = usePokemonList();
  const { handleChangeCurrentPokeList } = useCurrentPokemonList();

  const list_style =
    "p-1 text-center text-xs bg-white border cursor-pointer w-full hover:font-bold";

  const onSortBy = async () => {
    const list: IPokemon[] = convertPokeData(
      JSON.parse(JSON.stringify(pokemonList))
    );
    let filteredData: IPokemon[] = list.sort((a, b) => b[select] - a[select]);

    if (filteredData?.length > 0) {
      handlePokemonList(filteredData);
      handleChangeCurrentPokeList(filteredData.slice(0, 20));
    }

    handleCloseButton();
  };

  const onReverseSortBy = () => {
    const list: IPokemon[] = convertPokeData(
      JSON.parse(JSON.stringify(pokemonList))
    );
    const filteredData: IPokemon[] = list.sort((a, b) => a[select] - b[select]);

    if (filteredData?.length > 0) {
      handlePokemonList(filteredData);
      handleChangeCurrentPokeList(filteredData.slice(0, 20));
    }

    handleCloseButton();
  };

  return (
    <div className="w-full flex flex-col items-start">
      <label className="w-full font-bold text-foreground" htmlFor="sort-select">
        정렬
      </label>
      <select
        id="sort-select"
        value={select}
        className="mb-1 text-black font-bold border border-gray-300 h-7 w-full cursor-pointer"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelect(e.target.value as SortType)
        }
      >
        <option value="id">도감번호</option>
        <option value="weight">무게</option>
        <option value="height">키</option>
        <option value="hp">HP</option>
        <option value="attack">공격</option>
        <option value="defense">방어</option>
        <option value="specialAttack">특수공격</option>
        <option value="specialDefense">특수방어</option>
        <option value="speed">스피드</option>
        <option value="allStat">총합</option>
      </select>
      <ul className="w-full grid [grid-template-columns:repeat(2,49%)] justify-evenly pb-2">
        <li>
          <button
            type="button"
            className={cn(list_style, "text-black border-gray-300")}
            onClick={() => onSortBy()}
            aria-label={`${SORT_LABELS[select]} 기준 높은 순으로 정렬`}
          >
            높은 순
          </button>
        </li>
        <li>
          <button
            className={cn(list_style, "text-black border-gray-300")}
            onClick={() => onReverseSortBy()}
            aria-label={`${SORT_LABELS[select]} 기준 낮은 순으로 정렬`}
          >
            낮은 순
          </button>
        </li>
      </ul>
    </div>
  );
}
