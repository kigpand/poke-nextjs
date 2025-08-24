import { cn } from "@/lib/utils";
import { getColor, getTypeEn, getTypeIcon } from "@/utils/converter";
import Image from "next/image";
import Link from "next/link";

type Props = {
  isFrom: boolean;
  title: string;
  list: string[];
};

export default function TypeContainer({ isFrom, title, list }: Props) {
  return (
    <li
      className={cn(
        `rounded-2xl p-4 border border-green-200 `,
        isFrom ? "bg-green-50 border-green-200" : "bg-red-50  border-red-200"
      )}
    >
      <h3
        className={cn(
          "text-lg font-semibold mb-3 ",
          isFrom ? "text-green-700" : "text-red-700"
        )}
      >
        {title}
      </h3>
      {list.length ? (
        <div className="flex flex-wrap gap-2">
          {list.map((t) => {
            const typeEn = getTypeEn(t);
            const tipId = `tip-${typeEn}`;

            return (
              <Link
                href={`/type?type=${typeEn}`}
                key={t}
                className="relative flex items-center justify-center group"
                aria-label={`${t} 타입 상세 보기`}
                aria-describedby={tipId}
                title={`${t} 타입`}
              >
                <Image
                  src={getTypeIcon(typeEn)}
                  alt={`${t} 타입 아이콘`}
                  width={36}
                  height={36}
                  className="cursor-pointer rounded-md"
                />
                <p
                  id={tipId}
                  role="tooltip"
                  aria-hidden="true"
                  className="
                arrow_box absolute top-[40px] hidden w-[40px] rounded-md 
                px-0 py-1 text-center text-[12px] text-white z-[100] whitespace-nowrap
                group-hover:block bg-gray-800
              "
                  style={{
                    backgroundColor: getColor(t),
                  }}
                >
                  {t}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-sm font-semibold h-9 text-center leading-9">
          없음
        </p>
      )}
    </li>
  );
}
