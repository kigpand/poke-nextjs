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

/** 타입 정의 리스트 */
export const typeList = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

/** 세대 정의 리스트 */
export const geneList = ["1", "2", "3", "4", "5", "6", "7", "8"];

/** 타입별 정보 상수값 */
export const TYPE_DATA = {
  water: {
    ko: "물",
    color: "#4975ae",
    lineColor: "#0267c2",
    textColor: "#e3f2fd",
    icon: WATER,
  },
  grass: {
    ko: "풀",
    color: "#4d8133",
    lineColor: "#389a02",
    textColor: "#f0f8e5",
    icon: GRASS,
  },
  poison: {
    ko: "독",
    color: "#6b246e",
    lineColor: "#871dc5",
    textColor: "#f3e5f5",
    icon: POSION,
  },
  fire: {
    ko: "불꽃",
    color: "#b95731",
    lineColor: "#b60000",
    textColor: "#fff3e0",
    icon: FIRE,
  },
  normal: {
    ko: "노말",
    color: "#7c766b",
    lineColor: "#5a5a5a",
    textColor: "#f9f9f9",
    icon: NORMAL,
  },
  electric: {
    ko: "전기",
    color: "#86762d",
    lineColor: "#e4d72a",
    textColor: "#fffde7",
    icon: ELECTRIC,
  },
  ice: {
    ko: "얼음",
    color: "#447b90",
    lineColor: "#24dfe6",
    textColor: "#e0f7fa",
    icon: ICE,
  },
  fighting: {
    ko: "격투",
    color: "#9b6c2d",
    lineColor: "#973e15",
    textColor: "#fff8e1",
    icon: FIGHTING,
  },
  ground: {
    ko: "땅",
    color: "#92703f",
    lineColor: "#794b05",
    textColor: "#fbe9e7",
    icon: EARTH,
  },
  flying: {
    ko: "비행",
    color: "#64788e",
    lineColor: "#194ec0",
    textColor: "#e3f2fd",
    icon: AIR,
  },
  psychic: {
    ko: "에스퍼",
    color: "#b85967",
    lineColor: "#f52ba1",
    textColor: "#fce4ec",
    icon: MAGIC,
  },
  bug: {
    ko: "벌레",
    color: "#757731",
    lineColor: "#145a26",
    textColor: "#f1f8e9",
    icon: BUG,
  },
  rock: {
    ko: "바위",
    color: "#797456",
    lineColor: "#816f1d",
    textColor: "#f9fbe7",
    icon: ROCK,
  },
  ghost: {
    ko: "고스트",
    color: "#684870",
    lineColor: "#3d1877",
    textColor: "#f3e5f5",
    icon: GHOST,
  },
  dragon: {
    ko: "드래곤",
    color: "#535ca8",
    lineColor: "#434e8b",
    textColor: "#e8eaf6",
    icon: DRAGON,
  },
  dark: {
    ko: "악",
    color: "#4c4948",
    lineColor: "#383020",
    textColor: "#f5f5f5",
    icon: DARK,
  },
  steel: {
    ko: "강철",
    color: "#4d7d92",
    lineColor: "#444444",
    textColor: "#e1f5fe",
    icon: IRON,
  },
  fairy: {
    ko: "페어리",
    color: "#866f83",
    lineColor: "#ff18a7",
    textColor: "#fce4ec",
    icon: FAIRY,
  },
} as const;

/** 기본 색상 */
export const DEFAULT_COLOR = "white";

/** 기본 테두리 컬러 */
export const DEFAULT_LINE_COLOR = "#ffffff";

/** 기본 텍스트 컬러 */
export const DEFAULT_TEXT_COLOR = "#000000";

/** 기본 타입 */
export const DEFAULT_TYPE = "노말";

/** 기본 아이콘 */
export const DEFAULT_ICON = NORMAL;
