"use client";

import { useBookmark } from "@/hooks";
import Link from "next/link";
import { Button } from "../ui/button";
import { PokemonBox } from "../common";
import { IPokemon } from "@/interface/IPokemon";
import { X } from "lucide-react";
import { MAX_CAPACITY } from "@/constants/book";

function RemovableCard({
  pokemon,
  onRemove,
  children,
}: {
  pokemon: IPokemon;
  onRemove: (pokemon: IPokemon) => void;
  children: React.ReactNode;
}) {
  return (
    <div role="list" className="relative">
      {children}
      <button
        aria-label="삭제"
        onClick={() => onRemove(pokemon)}
        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/80 shadow-sm backdrop-blur transition hover:bg-background"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function BookmarkLists() {
  const { bookmarkList, removeBookmark } = useBookmark();
  return bookmarkList.length === 0 ? (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
      <div className="text-lg font-medium">저장된 포켓몬이 없어요</div>
      <p className="max-w-sm text-sm text-muted-foreground">
        도감에 추가하려면 포켓몬 상세 페이지에서 “저장”을 눌러주세요. 최대{" "}
        {MAX_CAPACITY}마리까지 저장할 수 있습니다.
      </p>
      <Link href="/">
        <Button size="sm">포켓몬 찾으러 가기</Button>
      </Link>
    </div>
  ) : (
    <ul className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
      {bookmarkList.map((pokemon) => (
        <RemovableCard
          key={pokemon.id}
          pokemon={pokemon}
          onRemove={removeBookmark}
        >
          <PokemonBox pokemon={pokemon} />
        </RemovableCard>
      ))}
    </ul>
  );
}
