"use client";

import { useBookmark } from "@/hooks";
import Link from "next/link";
import { Button } from "../ui/button";
import { PokemonBox } from "../common";
import { X } from "lucide-react";
import { MAX_CAPACITY } from "@/constants/book";
import { useEffect, useRef, useState } from "react";

export function BookmarkLists() {
  const { bookmarkList, removeBookmark } = useBookmark();
  const [lastRemoved, setLastRemoved] = useState<string | null>(null);
  // 삭제 안내용 라이브 리전
  const liveRef = useRef<HTMLSpanElement>(null);
  const count = bookmarkList.length;

  useEffect(() => {
    if (lastRemoved && liveRef.current) {
      liveRef.current.textContent = `${lastRemoved} 삭제됨. 현재 ${count}마리 저장됨.`;
      const t = setTimeout(() => setLastRemoved(null), 100);
      return () => clearTimeout(t);
    }
  }, [lastRemoved, count]);

  if (count === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
        <h4 className="text-lg font-medium">저장된 포켓몬이 없어요</h4>
        <p className="max-w-sm text-sm text-muted-foreground">
          도감에 추가하려면 포켓몬 상세 페이지에서 “저장”을 눌러주세요. 최대{" "}
          {MAX_CAPACITY}마리까지 저장할 수 있습니다.
        </p>
        <Button asChild variant="default" size="sm">
          <Link href="/" aria-label="포켓몬 리스트로 이동">
            포켓몬 찾으러 가기
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* 상태 변화 알림 */}
      <span
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <div
        role="list"
        className="list-none grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]"
      >
        {bookmarkList.map((pokemon, idx) => {
          const labelName = (pokemon as any).koreanName ?? pokemon.name;
          return (
            <div
              role="listitem"
              key={pokemon.id}
              id={`bookmark-item-${pokemon.id}`}
              className="relative"
            >
              <PokemonBox pokemon={pokemon} />

              <button
                type="button"
                aria-label={`${labelName} 삭제`}
                title="삭제"
                onClick={() => {
                  setLastRemoved(labelName);
                  removeBookmark(pokemon);
                }}
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/80 shadow-sm backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">삭제</span>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
