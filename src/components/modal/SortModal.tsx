"use client";
import ModalPortal from "@/portal/ModalPortal";
import pokemonList from "@/json/pokemonList.json";
import { convertPokeData } from "@/utils/converter";
import { useCurrentPokemonList, usePokemonList } from "@/hooks";
import { SortSelect } from "./sort/SortSelect";
import { SortButtons } from "./sort/SortButtons";
import { typeList, geneList } from "@/utils/sort";

type Props = {
  handleCloseModal: () => void;
};

export function SortModal({ handleCloseModal }: Props) {
  const { handlePokemonList } = usePokemonList();
  const { resetCurrentList } = useCurrentPokemonList();

  function onResetBtn() {
    const list = convertPokeData(pokemonList);

    handlePokemonList(list);
    resetCurrentList();
    handleCloseModal();
  }

  return (
    <ModalPortal
      handleCloseModal={handleCloseModal}
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
          <button
            className="w-full rounded-sm h-[30px] text-xs font-bold cursor-pointer"
            onClick={handleCloseModal}
          >
            닫기
          </button>
          <button
            className="w-full rounded-sm h-[30px] text-xs font-bold cursor-pointer"
            onClick={onResetBtn}
          >
            초기화
          </button>
        </article>
      }
    />
  );
}
