import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const listPath = path.join(root, "src/json/pokemonList.json");
const abilityPath = path.join(root, "src/json/ability.json");

const pokemonList = JSON.parse(fs.readFileSync(listPath, "utf8"));
const abilities = JSON.parse(fs.readFileSync(abilityPath, "utf8"));

const nameMap = new Map();
abilities.forEach((item) => {
  if (item.en) nameMap.set(item.en.toLowerCase(), item.name);
  if (item.name) nameMap.set(item.name.toLowerCase(), item.name);
});

const normalize = (value) => value.trim().toLowerCase();

const updated = pokemonList.map((pokemon) => {
  const list = (pokemon.abilities || "")
    .split(",")
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((ability) => nameMap.get(normalize(ability)) || ability);

  return {
    ...pokemon,
    abilities: list.join(","),
  };
});

fs.writeFileSync(listPath, JSON.stringify(updated, null, 2));
console.log(`Synced abilities in ${listPath}`);
