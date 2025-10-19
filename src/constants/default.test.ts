import type { IPrevPokemon } from "@/interface/IPrevPokemon";
import type { IServerType } from "@/interface/IServerType";
import {
  getColor,
  getLineColor,
  getTextColor,
  getTypeKo,
  getTypeEn,
  getStat,
  getTypeConvertData,
  typeConvertDamegeData,
  convertPokeData,
  convertOnePoke,
} from "@/utils/converter";

const makeStates = (s: {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}) =>
  `hp,${s.hp},attack,${s.attack},defense,${s.defense},specialAttack,${s.specialAttack},specialDefense,${s.specialDefense},speed,${s.speed}`;

describe("converter utils", () => {
  describe("타입 변환 계열", () => {
    it("한글 타입명을 영어 키로 정규화(getTypeEn)", () => {
      expect(getTypeEn("불꽃")).toBe("fire");
      expect(getTypeEn("fire")).toBe("fire");
      expect(getTypeEn("존재하지않음")).toBe("normal");
    });

    it("영어 키를 한글 타입명으로(getTypeKo)", () => {
      expect(getTypeKo("fire")).toBe("불꽃");
      expect(getTypeKo("water")).toBe("물");
      expect(getTypeKo("unknown")).toBe("노말");
    });

    it("색상/라인/텍스트 색상(getColor/getLineColor/getTextColor)", () => {
      expect(getColor("불꽃")).toBe("#e56c3e");
      expect(getLineColor("불꽃")).toBe("#b60000");
      expect(getTextColor("불꽃")).toBe("#fff3e0");

      expect(getColor("없쪙")).toBe("#ada594");
      expect(getLineColor("없쪙")).toBe("#5a5a5a");
      expect(getTextColor("없쪙")).toBe("#f9f9f9");
    });

    it("문자열 타입 리스트를 배열로 변환(getTypeConvertData)", () => {
      expect(getTypeConvertData("fire,water")).toEqual(["fire", "water"]);
      expect(getTypeConvertData("")).toBeNull();
      expect(getTypeConvertData(" ")).toEqual([" "]);
    });
  });

  describe("스탯 파싱(getStat)", () => {
    it("문자열 states를 객체로 변환하고 합계를 계산", () => {
      const states = makeStates({
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45,
      });

      const result = getStat(states);
      expect(result).toEqual({
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45,
        allStat: 45 + 49 + 49 + 65 + 65 + 45,
      });
    });
  });

  describe("타입 상성 변환(typeConvertDamegeData)", () => {
    it("영문 입력을 한글로 변환해 배열 생성", () => {
      const serverType: IServerType = {
        id: 1,
        name: "fire",
        doubleDamegeFrom: "water",
        doubleDamegeTo: "normal",
        halfDamegeFrom: "fire,normal",
        halfDamegeTo: "",
        noDamegeFrom: "",
        noDamegeTo: "water",
      };

      const converted = typeConvertDamegeData(serverType);
      expect(converted).toEqual({
        name: "불꽃",
        doubleFrom: ["물"],
        doubleTo: ["노말"],
        halfFrom: ["불꽃", "노말"],
        halfTo: [],
        noFrom: [],
        noTo: ["물"],
      });
    });

    it("빈 문자열은 빈 배열 처리", () => {
      const serverType: IServerType = {
        id: 1,
        name: "water",
        doubleDamegeFrom: "",
        doubleDamegeTo: "",
        halfDamegeFrom: "",
        halfDamegeTo: "",
        noDamegeFrom: "",
        noDamegeTo: "",
      };
      const converted = typeConvertDamegeData(serverType);
      expect(converted).toEqual({
        name: "물",
        doubleFrom: [],
        doubleTo: [],
        halfFrom: [],
        halfTo: [],
        noFrom: [],
        noTo: [],
      });
    });
  });

  describe("포켓몬 데이터 변환(convertPokeData / convertOnePoke)", () => {
    const basePrev: IPrevPokemon = {
      id: 1,
      name: "Bulbasaur",
      weight: 69,
      height: 7,
      flavor: "A strange seed was planted on its back at birth.",
      generate: "1세대",
      imageUrl: "https://example.com/1.png",
      genus: "Seed Pokémon",
      abilities: "Overgrow,Chlorophyll",
      pokeTypes: "fire,water",
      states: makeStates({
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45,
      }),
    };

    it("convertOnePoke: 단일 변환", () => {
      const p = convertOnePoke(basePrev);
      expect(p).toMatchObject({
        id: 1,
        name: "Bulbasaur",
        abilities: ["Overgrow", "Chlorophyll"],
        types: ["fire", "water"],
        imageUrl: "https://example.com/1.png",
      });
      expect(p).toHaveProperty("hp", 45);
      expect(p).toHaveProperty("allStat", 45 + 49 + 49 + 65 + 65 + 45);
    });

    it("convertPokeData: 리스트 변환", () => {
      const list = convertPokeData([
        basePrev,
        { ...basePrev, id: 2, name: "Ivysaur" },
      ]);
      expect(list).toHaveLength(2);
      expect(list[0].name).toBe("Bulbasaur");
      expect(list[1].name).toBe("Ivysaur");
      expect(list[0].abilities).toEqual(["Overgrow", "Chlorophyll"]);
      expect(list[0].types).toEqual(["fire", "water"]);
    });

    it("pokeTypes가 빈 문자열일 때 getTypeConvertData는 null을 반환", () => {
      const prev: IPrevPokemon = { ...basePrev, pokeTypes: "" };
      const one = convertOnePoke(prev);
      expect(one.types).toBeNull();
    });
  });
});
