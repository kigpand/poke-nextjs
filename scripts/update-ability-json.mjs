import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const jsonPath = path.join(root, "src/json/ability.json");

const normalizeText = (text = "") =>
  text.replace(/\f/g, "\n").replace(/\s+\n/g, "\n").trim();

const fetchAbilities = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/ability?limit=1000");
  if (!res.ok) throw new Error(`Failed to fetch abilities: ${res.status}`);
  const data = await res.json();
  return data.results;
};

const fetchAbilityDetail = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ability detail: ${res.status}`);
  return res.json();
};

const getKoText = (detail) => {
  const flavor = detail.flavor_text_entries?.find(
    (f) => f.language?.name === "ko"
  )?.flavor_text;
  if (flavor) return normalizeText(flavor);
  const effect = detail.effect_entries?.find(
    (e) => e.language?.name === "ko"
  )?.short_effect;
  return normalizeText(effect || "");
};

const main = async () => {
  const list = await fetchAbilities();
  const details = [];
  const existing = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, "utf8"))
    : [];

  for (const item of list) {
    if (item.name === "shadow" || item.name === "unknown") continue;
    const detail = await fetchAbilityDetail(item.url);
    const name =
      detail.names?.find((n) => n.language?.name === "ko")?.name || item.name;
    details.push({
      id: detail.id,
      name,
      text: getKoText(detail),
    });
    await new Promise((r) => setTimeout(r, 80));
  }

  const byId = new Map(existing.map((item) => [item.id, item]));
  for (const item of details) {
    byId.set(item.id, item);
  }

  const merged = Array.from(byId.values()).sort((a, b) => a.id - b.id);
  fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2));
  console.log(`Updated ${jsonPath} (${merged.length} abilities)`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
