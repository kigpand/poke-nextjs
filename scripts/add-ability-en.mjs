import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const abilityPath = path.join(root, "src/json/ability.json");

const abilities = JSON.parse(fs.readFileSync(abilityPath, "utf8"));

const fetchAbility = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch ability ${id}: ${res.status}`);
  return res.json();
};

const main = async () => {
  const updated = [];
  for (const ability of abilities) {
    if (ability.en) {
      updated.push(ability);
      continue;
    }
    console.log(`Fetching ability ${ability.id}...`);
    const detail = await fetchAbility(ability.id);
    updated.push({ ...ability, en: detail.name });
    await new Promise((r) => setTimeout(r, 80));
  }

  fs.writeFileSync(abilityPath, JSON.stringify(updated, null, 2));
  console.log(`Added en field to ${abilityPath}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
