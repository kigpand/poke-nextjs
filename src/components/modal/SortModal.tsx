"use client";
import ModalPortal from "@/portal/ModalPortal";
import { useCurrentPokemonList } from "@/hooks";
import { SortSelect } from "./sort/SortSelect";
import { SortButtons } from "./sort/SortButtons";
import { typeList, geneList } from "@/utils/sort";

type Props = {
  handleCloseModal: () => void;
};

export function SortModal({ handleCloseModal }: Props) {
  const { handleResetCurrentList } = useCurrentPokemonList();

  function onResetBtn() {
    handleResetCurrentList();
    handleCloseModal();
  }

  return (
    <ModalPortal
      handleCloseModal={handleCloseModal}
      component={
        <div
          role="dialog"
          aria-label="정렬 모달"
          id="sort-modal"
          className="bg-background text-foreground w-[300px] pt-2 pb-5 px-2 border border-foreground rounded-lg"
        >
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
            aria-label="모달 닫기 버튼"
            className="w-full rounded-sm h-[30px] text-xs font-bold cursor-pointer"
            onClick={handleCloseModal}
          >
            닫기
          </button>
          <button
            aria-label="정렬 초기화 버튼"
            className="w-full rounded-sm h-[30px] text-xs font-bold cursor-pointer"
            onClick={onResetBtn}
          >
            초기화
          </button>
        </div>
      }
    />
  );
}
