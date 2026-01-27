import type { IServerType } from "@/interface/IServerType";
import type { IPrevPokemon } from "@/interface/IPrevPokemon";
import type { IPokemon } from "@/interface/IPokemon";
import {
  DEFAULT_COLOR,
  DEFAULT_ICON,
  DEFAULT_LINE_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TYPE,
  TYPE_DATA,
} from "@/constants/default";

const KO_TO_EN = Object.entries(TYPE_DATA).reduce((acc, [en, { ko }]) => {
  acc[ko] = en;
  return acc;
}, {} as Record<string, string>);

function normalizeType(type: string): keyof typeof TYPE_DATA {
  if (TYPE_DATA[type as keyof typeof TYPE_DATA])
    return type as keyof typeof TYPE_DATA;
  return (KO_TO_EN[type] as keyof typeof TYPE_DATA) ?? "normal";
}

/** 속성에 맞는 색상 반환 함수 */
export function getColor(type: string) {
  const key = normalizeType(type);
  return TYPE_DATA[key]?.color || DEFAULT_COLOR;
}

/** 속성에 맞는 border or line 색상 반환 함수 */
export function getLineColor(type: string) {
  const key = normalizeType(type);
  return TYPE_DATA[key]?.lineColor || DEFAULT_LINE_COLOR;
}

/** 속성에 맞는 텍스트 색상 반환 함수 */
export function getTextColor(type: string) {
  return "#ffffff";
}

/** 영어 이름에 맞는 한글 속성 반환 함수  */
export function getTypeKo(type: string) {
  const key = normalizeType(type);
  return TYPE_DATA[key]?.ko || DEFAULT_TYPE;
}

/** 한글 이름에 맞는 영어 타입 반환 함수 */
export function getTypeEn(type: string) {
  return normalizeType(type);
}

/** 타입에 해당하는 아이콘 반환 함수  */
export function getTypeIcon(type: string) {
  const key = normalizeType(type);
  return TYPE_DATA[key]?.icon.src || DEFAULT_ICON;
}

export function getStat(stat: string) {
  const items = stat.split(",");

  const allCount =
    Number(items[1]) +
    Number(items[3]) +
    Number(items[5]) +
    Number(items[7]) +
    Number(items[9]) +
    Number(items[11]);
  return {
    hp: Number(items[1]),
    attack: Number(items[3]),
    defense: Number(items[5]),
    specialAttack: Number(items[7]),
    specialDefense: Number(items[9]),
    speed: Number(items[11]),
    allStat: allCount,
  };
}

/** 포켓몬 타입리스트 문자열 받아들여 타입 배열로 반환하는 함수 */
export function getTypeConvertData(typeInfo: string) {
  const array: string[] = typeInfo.split(",");
  if (array.length > 0 && array[0] !== "") {
    return array.map((arr: string) => {
      return arr;
    });
  }

  return null;
}

/** 타입의 반감, 2배, 노데미지 판정 확인해서 반환해주는 함수 */
export function typeConvertDamegeData(typeData: IServerType) {
  const convert = (data: string) =>
    data ? data.split(",").map(getTypeKo) : [];

  return {
    name: getTypeKo(typeData.name),
    doubleFrom: convert(typeData.doubleDamegeFrom),
    doubleTo: convert(typeData.doubleDamegeTo),
    halfFrom: convert(typeData.halfDamegeFrom),
    halfTo: convert(typeData.halfDamegeTo),
    noFrom: convert(typeData.noDamegeFrom),
    noTo: convert(typeData.noDamegeTo),
  };
}

export function convertPokeData(list: IPrevPokemon[]) {
  const pokeList: IPokemon[] = [];
  list.forEach((item: IPrevPokemon) => {
    const abilities = item.abilities.split(",");
    const types = getTypeConvertData(item.pokeTypes);
    const stat = getStat(item.states);
    pokeList.push({
      id: item.id,
      name: item.name,
      weight: item.weight,
      height: item.height,
      flavor: item.flavor,
      generate: item.generate,
      imageUrl: item.imageUrl,
      genus: item.genus,
      abilities,
      types,
      ...stat,
    });
  });

  return pokeList;
}

export function convertOnePoke(item: IPrevPokemon) {
  const abilities = item.abilities.split(",");
  const types = getTypeConvertData(item.pokeTypes);
  const stat = getStat(item.states);
  return {
    id: item.id,
    name: item.name,
    weight: item.weight,
    height: item.height,
    flavor: item.flavor,
    generate: item.generate,
    imageUrl: item.imageUrl,
    genus: item.genus,
    abilities,
    types,
    ...stat,
  };
}
