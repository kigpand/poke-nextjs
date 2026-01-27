import type { IPokemon } from "@/interface/IPokemon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";

type Props = {
  pokemon: IPokemon;
};

export const PokemonBox = memo(function PokemonBox({ pokemon }: Props) {
  return (
    <li className="w-full h-[200px] p-1 cursor-pointer border hover:bg-gray-200 border-[#e8e8e8]">
      <Link
        href={`/detail?id=${pokemon.id}`}
        prefetch={false}
        className="w-full h-full flex flex-col"
        aria-label={`${pokemon.name} 상세 페이지로 이동`}
      >
        <span
          aria-label="포켓몬 넘버"
          className="text-xl text-gray-400 font-semibold"
        >
          No.{pokemon.id}
        </span>
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="h-[140px] object-contain"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <h3
          className={cn("h-[60px] flex items-center justify-center font-bold")}
        >
          {pokemon.name}
        </h3>
      </Link>
    </li>
  );
});
