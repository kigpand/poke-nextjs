"use client";

import { cn } from "@/lib/utils";
import type { AbilitySortType } from "@/types/SortType";
import type { AbilityType } from "./AbilityLists";

type Props = {
  list: AbilityType[];
  search: string;
  sort: AbilitySortType;
  handleChangeSearch: (search: string) => void;
  handleChangeSort: (sort: AbilitySortType) => void;
};

export default function AbilitySearch({
  list,
  search,
  sort,
  handleChangeSearch,
  handleChangeSort,
}: Props) {
  const searchInputId = "ability-search-input";

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <label
          htmlFor={searchInputId}
          className="text-xs font-medium text-muted-foreground mb-1 block"
        >
          특성 검색
        </label>
        <input
          id={searchInputId}
          className="w-[250px] p-2 rounded border-2 border-gray-200 outline-0"
          placeholder="특성 이름으로 검색해보세요"
          value={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between md:justify-end gap-2 mt-1">
        <span className="text-xs text-muted-foreground">
          검색 결과{" "}
          <span className="font-semibold text-foreground">{list.length}</span>개
        </span>

        <div
          aria-label="정렬 기준"
          className="inline-flex items-center gap-1 rounded-full bg-muted px-1 py-1"
        >
          <button
            type="button"
            onClick={() => handleChangeSort("id")}
            aria-pressed={sort === "id"}
            className={cn(
              "px-2 py-1 text-xs rounded-full transition",
              sort === "id"
                ? "bg-background shadow-sm font-semibold"
                : "text-muted-foreground"
            )}
          >
            번호순
          </button>
          <button
            type="button"
            onClick={() => handleChangeSort("name")}
            aria-pressed={sort === "name"}
            className={cn(
              "px-2 py-1 text-xs rounded-full transition",
              sort === "name"
                ? "bg-background shadow-sm font-semibold"
                : "text-muted-foreground"
            )}
          >
            이름순
          </button>
        </div>
      </div>
    </div>
  );
}
