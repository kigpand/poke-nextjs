"use client";
import { useCurrentPokemon, usePokemonList, useScroll } from "@/hooks";
import { PokemonBox } from "../common";
import { useEffect } from "react";

export default function PokemonLists() {
  const { scroll } = useScroll();
  const { pokemonList } = usePokemonList();
  const { currentPoke, handleAddCurrentList } = useCurrentPokemon();

  function returnToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (scroll !== 0) {
      const count = currentPoke.length;
      handleAddCurrentList(pokemonList.slice(count, count + 9));
    }
  }, [scroll]);

  return (
    <ul className="pokemon-grid gap-2 w-[90%]">
      {currentPoke.map((poke) => {
        return <PokemonBox key={poke.id} pokemon={poke} />;
      })}
    </ul>
  );
}
