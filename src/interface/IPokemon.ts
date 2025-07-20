export interface IPokemon {
  abilities: string[];
  genus: string;
  height: number;
  id: number;
  name: string;
  imageUrl: string;
  weight: number;
  flavor: string;
  generate: string;
  types: string[] | null;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  allStat: number;
}
