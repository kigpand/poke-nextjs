import NORMAL from "@/assets/svg/normal.svg";
import AIR from "@/assets/svg/air.svg";
import BUG from "@/assets/svg/bug.svg";
import DARK from "@/assets/svg/dark.svg";
import DRAGON from "@/assets/svg/dragon.svg";
import EARTH from "@/assets/svg/earth.svg";
import ELECTRIC from "@/assets/svg/electric.svg";
import FAIRY from "@/assets/svg/fairy.svg";
import FIGHTING from "@/assets/svg/fighting.svg";
import FIRE from "@/assets/svg/fire.svg";
import GHOST from "@/assets/svg/ghost.svg";
import GRASS from "@/assets/svg/grass.svg";
import ICE from "@/assets/svg/ice.svg";
import IRON from "@/assets/svg/iron.svg";
import MAGIC from "@/assets/svg/magic.svg";
import POSION from "@/assets/svg/posion.svg";
import ROCK from "@/assets/svg/rock.svg";
import WATER from "@/assets/svg/water.svg";
import type { SortType } from "@/types/SortType";
import type { IServerType } from "@/interface/IServerType";
import { IPrevPokemon } from "@/interface/IPrevPokemon";
import { IPokemon } from "@/interface/IPokemon";

export const MOBILE_SIZE = 412;

export const LAST_NUM = 898;

interface IBackgroundColor {
  [index: string]: string; // 이렇게 한 줄만 써주면 된다
  hp: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  speed: string;
  allStat: string;
}

const TYPE_DATA = {
  water: { ko: "물", color: "#5185c5", lineColor: "#0267c2", icon: WATER },
  grass: { ko: "풀", color: "#66a945", lineColor: "#389a02", icon: GRASS },
  poison: { ko: "독", color: "#6b246e", lineColor: "#871dc5", icon: POSION },
  fire: { ko: "불꽃", color: "#e56c3e", lineColor: "#b60000", icon: FIRE },
  normal: { ko: "노말", color: "#ada594", lineColor: "#5a5a5a", icon: NORMAL },
  electric: {
    ko: "전기",
    color: "#f6d851",
    lineColor: "#e4d72a",
    icon: ELECTRIC,
  },
  ice: { ko: "얼음", color: "#6dc8eb", lineColor: "#24dfe6", icon: ICE },
  fighting: {
    ko: "격투",
    color: "#e09c40",
    lineColor: "#973e15",
    icon: FIGHTING,
  },
  ground: { ko: "땅", color: "#9c7743", lineColor: "#794b05", icon: EARTH },
  flying: { ko: "비행", color: "#a2c3e7", lineColor: "#194ec0", icon: AIR },
  psychic: {
    ko: "에스퍼",
    color: "#dd6b7b",
    lineColor: "#f52ba1",
    icon: MAGIC,
  },
  bug: { ko: "벌레", color: "#9fa244", lineColor: "#145a26", icon: BUG },
  rock: { ko: "바위", color: "#bfb889", lineColor: "#816f1d", icon: ROCK },
  ghost: { ko: "고스트", color: "#684870", lineColor: "#3d1877", icon: GHOST },
  dragon: {
    ko: "드래곤",
    color: "#535ca8",
    lineColor: "#434e8b",
    icon: DRAGON,
  },
  dark: { ko: "악", color: "#4c4948", lineColor: "#383020", icon: DARK },
  steel: { ko: "강철", color: "#69a9c7", lineColor: "#444444", icon: IRON },
  fairy: { ko: "페어리", color: "#dab4d4", lineColor: "#ff18a7", icon: FAIRY },
} as const;

const DEFAULT_COLOR = "white";
const DEFAULT_LINE_COLOR = "#ffffff";
const DEFAULT_TYPE = "노말";
const DEFAULT_ICON = NORMAL;

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

/** detail page status bar 색상 반환 함수 */
export function getStatusBarColor(name: string) {
  const backgroundColor: IBackgroundColor = {
    hp: "red",
    attack: "orange",
    defense: "rgb(55, 55, 255)",
    specialAttack: "pink",
    specialDefense: "purple",
    speed: "green",
    allStat: "gray",
  };

  return backgroundColor[name];
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

export function getStatKorea(stat: SortType) {
  if (stat === "hp") return "HP";
  if (stat === "attack") return "공격";
  if (stat === "defense") return "방어";
  if (stat === "specialAttack") return "특수공격";
  if (stat === "specialDefense") return "특수방어";
  if (stat === "speed") return "스피드";
  return "총합";
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

/** 데미지 한글이름 반환 */
export const getDamegeType: any = {
  doubleFrom: "x2 데미지 받음",
  doubleTo: "x2 데미지 줌",
  halfFrom: "0.5 데미지 받음",
  halfTo: "0.5 데미지 줌",
  noFrom: "데미지를 받지않음",
  noTo: "데미지를 줄수없음",
};

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
