"use client";

import { useBookmark } from "@/hooks";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Home, Trash2 } from "lucide-react";
import { MAX_CAPACITY } from "@/constants/book";

export function Header() {
  const { bookmarkList, clearBookmark } = useBookmark();

  const capacityText = useMemo(
    () => `${bookmarkList.length} / ${MAX_CAPACITY}`,
    [bookmarkList.length]
  );

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-bold">나의 도감</h1>
        <span className="text-sm text-muted-foreground">
          용량 {capacityText}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="secondary" size="sm" aria-label="홈">
            <Home className="mr-2 h-4 w-4" />홈
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={clearBookmark}
          disabled={bookmarkList.length === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          전체 비우기
        </Button>
      </div>
    </div>
  );
}
