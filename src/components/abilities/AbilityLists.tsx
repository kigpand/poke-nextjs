"use client";

import { useMemo, useState } from "react";
import type { AbilitySortType } from "@/types/SortType";
import AbilitySearch from "./AbilitySearch";
import AbilityListItem from "./AbilityListItem";

export type AbilityType = {
  id: number;
  name: string;
  text: string;
};

type Props = {
  abilities: AbilityType[];
};

export default function AbilityLists({ abilities }: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<AbilitySortType>("id");

  const filtered = useMemo(() => {
    const text = search.trim();

    let list = abilities;

    if (text) {
      list = list.filter((item) => {
        return item.name.includes(text);
      });
    }

    list = [...list].sort((a, b) => {
      if (sort === "id") return a.id - b.id;
      return a.name.localeCompare(b.name, "ko");
    });

    return list;
  }, [abilities, search, sort]);

  const sectionTitleId = "ability-section-title";

  return (
    <section
      aria-labelledby={sectionTitleId}
      className="space-y-4 md:space-y-6"
    >
      <AbilitySearch
        list={filtered}
        search={search}
        sort={sort}
        handleChangeSearch={setSearch}
        handleChangeSort={setSort}
      />

      {filtered.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm text-muted-foreground">
          <span>검색 결과가 없습니다.</span>
          <span className="text-xs">다른 키워드로 다시 시도해보세요.</span>
        </div>
      ) : (
        <ul className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ability) => {
            return <AbilityListItem key={ability.id} ability={ability} />;
          })}
        </ul>
      )}
    </section>
  );
}
