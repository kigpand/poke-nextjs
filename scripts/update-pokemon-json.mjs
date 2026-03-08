import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const jsonPath = path.join(root, "src/json/pokemonList.json");

const args = process.argv.slice(2);
const getArg = (key) => {
  const idx = args.indexOf(key);
  return idx >= 0 ? args[idx + 1] : undefined;
};

const startArg = getArg("--start");
const endArg = getArg("--end");

const existing = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const maxId = existing.reduce((acc, p) => Math.max(acc, p.id), 0);

const getCount = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
  if (!res.ok) throw new Error(`Failed to fetch count: ${res.status}`);
  const data = await res.json();
  return data.count;
};

const abilityNameCache = new Map();

const getAbilityKo = async (url, fallback) => {
  if (abilityNameCache.has(url)) return abilityNameCache.get(url);
  const res = await fetch(url);
  if (!res.ok) return fallback;
  const data = await res.json();
  const ko = data.names?.find((n) => n.language?.name === "ko")?.name;
  const name = ko || fallback;
  abilityNameCache.set(url, name);
  return name;
};

const normalizeFlavor = (text = "") =>
  text.replace(/\f/g, "\n").replace(/\s+\n/g, "\n").trim();

const generationLabel = (genName) => {
  const match = /generation-(\w+)/.exec(genName || "");
  if (!match) return "";
  const map = {
    i: "1",
    ii: "2",
    iii: "3",
    iv: "4",
    v: "5",
    vi: "6",
    vii: "7",
    viii: "8",
    ix: "9",
  };
  return `${map[match[1]] || ""}세대`;
};

const getStat = (stats, name) =>
  stats.find((s) => s.stat?.name === name)?.base_stat ?? 0;

const buildStates = (stats) =>
  `hp, ${getStat(stats, "hp")},attack, ${getStat(
    stats,
    "attack"
  )},defense, ${getStat(stats, "defense")},special-attack, ${getStat(
    stats,
    "special-attack"
  )},special-defense, ${getStat(
    stats,
    "special-defense"
  )},speed, ${getStat(stats, "speed")}`;

const fetchPokemonData = async (id) => {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
  ]);

  if (!pokemonRes.ok) {
    throw new Error(`Pokemon ${id} fetch failed: ${pokemonRes.status}`);
  }
  if (!speciesRes.ok) {
    throw new Error(`Species ${id} fetch failed: ${speciesRes.status}`);
  }

  const pokemon = await pokemonRes.json();
  const species = await speciesRes.json();

  const koName =
    species.names?.find((n) => n.language?.name === "ko")?.name ||
    pokemon.name;
  const genus =
    species.genera?.find((g) => g.language?.name === "ko")?.genus || "";
  const flavor = normalizeFlavor(
    species.flavor_text_entries?.find((f) => f.language?.name === "ko")
      ?.flavor_text
  );

  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    "";

  const abilities = await Promise.all(
    pokemon.abilities.map((ab) =>
      getAbilityKo(ab.ability.url, ab.ability.name)
    )
  );

  return {
    id,
    name: koName,
    generate: generationLabel(species.generation?.name),
    imageUrl,
    states: buildStates(pokemon.stats),
    abilities: abilities.join(","),
    pokeTypes: pokemon.types
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name)
      .join(","),
    weight: pokemon.weight,
    height: pokemon.height,
    genus,
    flavor,
  };
};

const main = async () => {
  const total = await getCount();
  const start = startArg ? Number(startArg) : maxId + 1;
  const end = endArg ? Number(endArg) : total;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end) {
    throw new Error("Invalid --start/--end range.");
  }
  if (start > total) {
    console.log("No new Pokemon to fetch.");
    return;
  }

  const newItems = [];
  for (let id = start; id <= end; id++) {
    console.log(`Fetching ${id}/${end}...`);
    const item = await fetchPokemonData(id);
    newItems.push(item);
    await new Promise((r) => setTimeout(r, 120));
  }

  const merged = [...existing, ...newItems].sort((a, b) => a.id - b.id);
  fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2));
  console.log(`Updated ${jsonPath} (+${newItems.length})`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
