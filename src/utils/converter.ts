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

/** 속성에 맞는 색상 반환 함수 */
export function getColor(type: string) {
  if (type === "water" || type === "물") return "#5185c5";
  if (type === "grass" || type === "풀") return "#66a945";
  if (type === "poison" || type === "독") return "#6b246e";
  if (type === "fire" || type === "불꽃") return "#e56c3e";
  if (type === "normal" || type === "노말") return "#ada594";
  if (type === "electric" || type === "전기") return "#f6d851";
  if (type === "ice" || type === "얼음") return "#6dc8eb";
  if (type === "fighting" || type === "격투") return "#e09c40";
  if (type === "ground" || type === "땅") return "#9c7743";
  if (type === "flying" || type === "비행") return "#a2c3e7";
  if (type === "psychic" || type === "에스퍼") return "#dd6b7b";
  if (type === "bug" || type === "벌레") return "#9fa244";
  if (type === "rock" || type === "바위") return "#bfb889";
  if (type === "ghost" || type === "고스트") return "#684870";
  if (type === "dragon" || type === "드래곤") return "#535ca8";
  if (type === "dark" || type === "악") return "#4c4948";
  if (type === "steel" || type === "강철") return "#69a9c7";
  if (type === "fairy" || type === "페어리") return "#dab4d4";
  return "white";
}

/** 속성에 맞는 border or line 색상 반환 함수 */
export function getLineColor(type: string) {
  if (type === "water" || type === "물") return "#0267c2";
  if (type === "grass" || type === "풀") return "#389a02";
  if (type === "poison" || type === "독") return "#871dc5";
  if (type === "fire" || type === "불꽃") return "#b60000";
  if (type === "normal" || type === "노말") return "#5a5a5a";
  if (type === "electric" || type === "전기") return "#e4d72a";
  if (type === "ice" || type === "얼음") return "#24dfe6";
  if (type === "fighting" || type === "격투") return "#973e15";
  if (type === "ground" || type === "땅") return "#794b05";
  if (type === "flying" || type === "비행") return "#194ec0";
  if (type === "psychic" || type === "에스퍼") return "#f52ba1";
  if (type === "bug" || type === "벌레") return "#145a26";
  if (type === "rock" || type === "바위") return "#816f1d";
  if (type === "ghost" || type === "고스트") return "#3d1877";
  if (type === "dragon" || type === "드래곤") return "#434e8b";
  if (type === "dark" || type === "악") return "#383020";
  if (type === "steel" || type === "강철") return "#444444";
  if (type === "fairy" || type === "페어리") return "#ff18a7";
  return "#ffffff";
}

/** 영어 이름에 맞는 한글 속성 반환 함수  */
export function getTypeKo(type: string) {
  if (type === "water") return "물";
  if (type === "grass") return "풀";
  if (type === "poison") return "독";
  if (type === "fire") return "불꽃";
  if (type === "normal") return "노말";
  if (type === "electric") return "전기";
  if (type === "ice") return "얼음";
  if (type === "fighting") return "격투";
  if (type === "ground") return "땅";
  if (type === "flying") return "비행";
  if (type === "psychic") return "에스퍼";
  if (type === "bug") return "벌레";
  if (type === "rock") return "바위";
  if (type === "ghost") return "고스트";
  if (type === "dragon") return "드래곤";
  if (type === "dark") return "악";
  if (type === "steel") return "강철";
  if (type === "fairy") return "페어리";
  return "노말";
}

/** 한글 이름에 맞는 영어 타입 반환 함수 */
export function getTypeEn(type: string) {
  if (type === "물") return "water";
  if (type === "풀") return "grass";
  if (type === "독") return "poison";
  if (type === "불꽃") return "fire";
  if (type === "노말") return "normal";
  if (type === "전기") return "electric";
  if (type === "얼음") return "ice";
  if (type === "격투") return "fighting";
  if (type === "땅") return "ground";
  if (type === "비행") return "flying";
  if (type === "에스퍼") return "psychic";
  if (type === "벌레") return "bug";
  if (type === "바위") return "rock";
  if (type === "고스트") return "ghost";
  if (type === "드래곤") return "dragon";
  if (type === "악") return "dark";
  if (type === "강철") return "steel";
  if (type === "페어리") return "fairy";
  return "노말";
}

/** 타입에 해당하는 아이콘 반환 함수  */
export function getTypeIcon(type: string) {
  if (type === "water" || type === "물") return WATER;
  if (type === "grass" || type === "풀") return GRASS;
  if (type === "poison" || type === "독") return POSION;
  if (type === "fire" || type === "불꽃") return FIRE;
  if (type === "normal" || type === "노말") return NORMAL;
  if (type === "electric" || type === "전기") return ELECTRIC;
  if (type === "ice" || type === "얼음") return ICE;
  if (type === "fighting" || type === "격투") return FIGHTING;
  if (type === "ground" || type === "땅") return EARTH;
  if (type === "flying" || type === "비행") return AIR;
  if (type === "psychic" || type === "에스퍼") return MAGIC;
  if (type === "bug" || type === "벌레") return BUG;
  if (type === "rock" || type === "바위") return ROCK;
  if (type === "ghost" || type === "고스트") return GHOST;
  if (type === "dragon" || type === "드래곤") return DRAGON;
  if (type === "dark" || type === "악") return DARK;
  if (type === "steel" || type === "강철") return IRON;
  if (type === "fairy" || type === "페어리") return FAIRY;
  return "노말";
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
  const name = getTypeKo(typeData.name);
  const doubleFrom =
    typeData.doubleDamegeFrom !== ""
      ? typeData.doubleDamegeFrom.split(",").map((v: string) => {
          return getTypeKo(v);
        })
      : [];
  const doubleTo =
    typeData.doubleDamegeTo !== ""
      ? typeData.doubleDamegeTo.split(",").map((v: string) => {
          return getTypeKo(v);
        })
      : [];
  const halfFrom =
    typeData.halfDamegeFrom !== ""
      ? typeData.halfDamegeFrom.split(",").map((v: string) => {
          return getTypeKo(v);
        })
      : [];
  const halfTo =
    typeData.halfDamegeTo !== ""
      ? typeData.halfDamegeTo.split(",").map((v: string) => {
          return getTypeKo(v);
        })
      : [];
  const noFrom =
    typeData.noDamegeFrom !== ""
      ? typeData.noDamegeFrom.split(",").map((v: string) => {
          return getTypeKo(v);
        })
      : [];
  const noTo =
    typeData.noDamegeTo !== ""
      ? typeData.noDamegeTo.split(",").map((v: string) => {
          return getTypeKo(v);
        })
      : [];

  return { name, doubleFrom, doubleTo, halfFrom, halfTo, noFrom, noTo };
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
