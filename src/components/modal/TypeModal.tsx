"use client";

import ModalPortal from "@/portal/ModalPortal";
import types from "@/json/types.json";
import { getTypeIcon, getTypeKo } from "@/utils/converter";
import { useRouter } from "next/navigation";

type Props = {
  handleCloseModal: () => void;
};

export function TypeModal({ handleCloseModal }: Props) {
  const router = useRouter();

  function onTypeButton(type: string) {
    router.push(`/type?type=${type}`);
    handleCloseModal();
  }

  return (
    <ModalPortal
      handleCloseModal={handleCloseModal}
      component={
        <div
          role="dialog"
          aria-modal="true"
          id="type-modal"
          aria-labelledby="modal-title"
          className="bg-background text-foreground w-[300px] pt-2 pb-5 border border-foreground rounded-lg"
        >
          <label id="modal-title" className="w-full pb-2 pl-2 font-bold">
            타입을 선택해주세요
          </label>
          <ul className="w-full flex-grow p-2 grid [grid-template-columns:repeat(3,60px)] gap-2 items-center justify-center">
            {types.map((item, i) => {
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => onTypeButton(item.name)}
                    className="group cursor-pointer relative h-[60px] w-[60px] overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className="absolute inset-0 z-[1] hidden items-center justify-center font-bold text-white text-[14px] group-hover:flex group-focus-visible:flex"
                      style={{ background: "rgba(0,0,0,0.4)" }}
                    >
                      {getTypeKo(item.name)}
                    </span>
                    <img
                      className="w-full h-full object-contain"
                      src={getTypeIcon(item.name)}
                      alt={`${getTypeKo(item.name)} 타입 아이콘`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      }
    />
  );
}
