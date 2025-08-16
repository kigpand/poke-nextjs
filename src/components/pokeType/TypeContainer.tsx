"use client";

import { cn } from "@/lib/utils";
import { getColor, getTypeEn, getTypeIcon } from "@/utils/converter";
import { useRouter } from "next/navigation";

type Props = {
  isFrom: boolean;
  title: string;
  list: string[];
};

export default function TypeContainer({ isFrom, title, list }: Props) {
  const router = useRouter();

  function onTypeClick(type: string) {
    router.push(`/type?type=${getTypeEn(type)}`);
  }

  return (
    <section
      className={cn(
        `rounded-2xl p-4 border border-green-200 `,
        isFrom ? "bg-green-50 border-green-200" : "bg-red-50  border-red-200"
      )}
    >
      <h2
        className={cn(
          "text-lg font-semibold mb-3 ",
          isFrom ? "text-green-700" : "text-red-700"
        )}
      >
        {title}
      </h2>
      {list.length ? (
        <div className="flex flex-wrap gap-2">
          {list.map((t) => (
            <div
              key={t}
              className="relative flex items-center justify-center group"
            >
              <img
                src={getTypeIcon(getTypeEn(t))}
                className="icon cursor-pointer h-[40px] object-contain rounded-md"
                onClick={() => onTypeClick(t)}
              />
              <p
                className="
                arrow_box absolute top-[45px] hidden w-[40px] rounded-md 
                px-0 py-1 text-center text-[12px] text-white z-[100] whitespace-nowrap
                group-hover:block bg-gray-800
              "
                style={{
                  backgroundColor: getColor(t),
                }}
              >
                {t}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">없음</p>
      )}
    </section>
  );
}
