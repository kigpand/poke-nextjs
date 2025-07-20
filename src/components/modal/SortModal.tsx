"use client";
import ModalPortal from "@/portal/ModalPortal";
import pokemonList from "@/json/pokemonList.json";
import { convertPokeData } from "@/utils/converter";
import { useCurrentPokemon, usePokemonList } from "@/hooks";
import { SortSelect } from "./sort/SortSelect";
import { SortButtons } from "./sort/SortButton";
import { typeList, geneList } from "@/utils/sort";

type Props = {
  handleCloseModal: () => void;
};

export function SortModal({ handleCloseModal }: Props) {
  const { handlePokemonList } = usePokemonList();
  const { resetCurrentList } = useCurrentPokemon();

  function onResetBtn() {
    const list = convertPokeData(pokemonList);

    handlePokemonList(list);
    resetCurrentList();
    handleCloseModal();
  }

  return (
    <ModalPortal
      component={
        <article className="bg-background text-foreground w-[300px] pt-2 pb-5 px-2 border border-foreground rounded-lg">
          <SortSelect handleCloseButton={handleCloseModal} />
          <SortButtons
            title="타입"
            type="type"
            list={typeList}
            handleCloseButton={handleCloseModal}
          />
          <SortButtons
            title="세대"
            type="gene"
            list={geneList}
            handleCloseButton={handleCloseModal}
          />
        </article>
      }
      handleCloseModal={handleCloseModal}
    />
  );
}
