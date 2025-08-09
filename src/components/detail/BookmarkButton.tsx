"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useBookmark } from "@/hooks";
import { IPokemon } from "@/interface/IPokemon";

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
      addBookmark(pokemon, () => alert("도감에 등록되었습니다"));
    }
  }
  return (
    <Button
      variant={isBookmark ? "default" : "secondary"}
      onClick={handleBookmarkButton}
      className="ml-2 cursor-pointer"
    >
      <Heart className={`mr-2 h-4 w-4 ${isBookmark ? "fill-current" : ""}`} />
      {isBookmark ? "Favorited" : "Favorite"}
    </Button>
  );
}
