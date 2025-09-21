import type { IPokemon } from "@/interface/IPokemon";

export const TEST_POKE: IPokemon = {
  id: 3,
  name: "이상해꽃",
  weight: 1000,
  height: 20,
  flavor: "큰 꽃잎을 펼쳐\n햇빛을 받고 있으면\n몸에 힘이 넘쳐흐른다.",
  abilities: ["심록", "엽록소"],
  allStat: 525,
  attack: 82,
  defense: 83,
  generate: "1세대",
  genus: "씨앗포켓몬",
  hp: 80,
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
  specialAttack: 100,
  specialDefense: 100,
  speed: 80,
  types: ["grass", "poison"],
} as const;
