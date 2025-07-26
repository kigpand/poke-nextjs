"use client";

import { useBookmark } from "@/hooks/useBookmark";
import { IPokemon } from "@/interface/IPokemon";
import { cn } from "@/lib/utils";
import { getColor } from "@/utils/converter";
import { useRouter } from "next/navigation";

type Props = {
  pokemon: IPokemon;
};

export function PokemonBox({ pokemon }: Props) {
  const { findBookmark } = useBookmark();
  const router = useRouter();

  function handleBoxClick() {
    router.push(`/detail?id=${pokemon.id}`);
  }

  return (
    <li
      className={cn(
        "w-full h-[200px] p-1 flex flex-col cursor-pointer border hover:bg-gray-200",
        findBookmark(pokemon)
          ? `border-[${getColor(pokemon.types![0])}]`
          : "border-[#e8e8e8]"
      )}
      onClick={handleBoxClick}
    >
      <p className="text-xl text-gray-400">No.{pokemon.id}</p>
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        className="h-[140px] object-contain"
      />
      <h2
        className={cn(
          "h-[60px] flex items-center justify-center font-bold",
          findBookmark(pokemon)
            ? `text-[${getColor(pokemon.types![0])}]`
            : "text-foreground"
        )}
      >
        {pokemon.name}
      </h2>
    </li>
  );
}
