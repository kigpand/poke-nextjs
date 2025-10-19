"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useBookmark } from "@/hooks";
import { toast } from "sonner";
import type { IPokemon } from "@/interface/IPokemon";

type Props = {
  pokemon: IPokemon;
};

export default function BookmarkButton({ pokemon }: Props) {
  const { addBookmark, findBookmark, removeBookmark } = useBookmark();
  const isBookmark = findBookmark(pokemon);

  function handleBookmarkButton() {
    if (isBookmark) {
      removeBookmark(pokemon);
    } else {
      addBookmark(pokemon, () =>
        toast.success("도감 추가", {
          description: `${pokemon.name}이(가) 도감에 등록되었습니다.`,
          duration: 1000,
        })
      );
    }
  }
  return (
    <Button
      variant={isBookmark ? "default" : "secondary"}
      onClick={handleBookmarkButton}
      className="ml-2 cursor-pointer"
      aria-pressed={isBookmark}
      title={isBookmark ? "북마크 해제" : "북마크 추가"}
    >
      <Heart className={`mr-2 h-4 w-4 ${isBookmark ? "fill-current" : ""}`} />
      {isBookmark ? "Favorited" : "Favorite"}
    </Button>
  );
}
