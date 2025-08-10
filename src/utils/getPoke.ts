import type { IPokemon } from "@/interface/IPokemon";
import megaList from "@/json/mega.json";
import { convertOnePoke } from "./converter";

/**
 * 메가진화 포켓몬 찾아 반환해주는 함수
 * @param poke 메가진화 찾을 포켓몬 정보
 */
export function getMegaPokemon(poke: IPokemon | null) {
  if (!poke) return null;

  const isMultipleForms = [6, 150].includes(poke.id);

  const resultList = isMultipleForms
    ? megaList.filter((item) => item.id === poke.id)
    : megaList.find((item) => item.id === poke.id)
    ? [megaList.find((item) => item.id === poke.id)!]
    : [];

  if (resultList.length === 0) return null;

  return resultList.map((item) => {
    const convertData = {
      ...item,
      generate: poke.generate,
      flavor: poke.flavor,
    };
    return convertOnePoke(convertData);
  });
}
