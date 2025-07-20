"use client";

import ModalPortal from "@/portal/ModalPortal";
import types from "@/json/types.json";
import { useTypeStorage } from "@/hooks/useTypeStorage";
import { getTypeIcon, getTypeKo } from "@/utils/converter";

type Props = {
  handleCloseModal: () => void;
};

export function TypeModal({ handleCloseModal }: Props) {
  const { setTypeStorage } = useTypeStorage();

  function onTypeButton(type: string) {
    setTypeStorage(type);
    handleCloseModal();
  }

  return (
    <ModalPortal
      handleCloseModal={handleCloseModal}
      component={
        <article className="bg-background text-foreground w-[300px] pt-2 pb-5 border border-foreground rounded-lg">
          <label className="w-full pb-2 pl-2 font-bold">
            타입을 선택해주세요
          </label>
          <div className="w-full flex-grow p-2 grid [grid-template-columns:repeat(3,60px)] gap-2 items-center justify-center">
            {types.map((item, i) => {
              return (
                <div
                  className="relative h-[60px] cursor-pointer group"
                  key={i}
                  onClick={() => onTypeButton(item.name)}
                >
                  <div className="absolute inset-0 bg-black/40 z-[1] font-bold text-white text-[18px] hidden items-center justify-center group-hover:flex type-anim">
                    {getTypeKo(item.name)}
                  </div>
                  <img
                    className="w-full h-full"
                    src={getTypeIcon(item.name)}
                    alt={item.name}
                  />
                </div>
              );
            })}
          </div>
        </article>
      }
    />
  );
}
