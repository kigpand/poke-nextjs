import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const jsonPath = path.join(root, "src/json/types.json");

const toList = (items) =>
  items && items.length > 0 ? items.map((t) => t.name).join(",") : "";

const fetchTypes = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/type?limit=100");
  if (!res.ok) throw new Error(`Failed to fetch types: ${res.status}`);
  const data = await res.json();
  return data.results;
};

const fetchTypeDetail = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch type detail: ${res.status}`);
  return res.json();
};

const main = async () => {
  const list = await fetchTypes();
  const details = [];
  const existing = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, "utf8"))
    : [];

  for (const item of list) {
    if (item.name === "shadow" || item.name === "unknown") continue;
    const detail = await fetchTypeDetail(item.url);
    const rel = detail.damage_relations;
    details.push({
      id: detail.id,
      name: detail.name,
      doubleDamegeFrom: toList(rel.double_damage_from),
      doubleDamegeTo: toList(rel.double_damage_to),
      halfDamegeFrom: toList(rel.half_damage_from),
      halfDamegeTo: toList(rel.half_damage_to),
      noDamegeFrom: toList(rel.no_damage_from),
      noDamegeTo: toList(rel.no_damage_to),
    });
    await new Promise((r) => setTimeout(r, 80));
  }

  const byName = new Map(existing.map((item) => [item.name, item]));
  for (const item of details) {
    byName.set(item.name, item);
  }

  const merged = Array.from(byName.values()).sort((a, b) => a.id - b.id);
  fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2));
  console.log(`Updated ${jsonPath} (${merged.length} types)`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
