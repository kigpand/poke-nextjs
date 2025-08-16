import { cn } from "@/lib/utils";
import { getTypeEn, getTypeIcon } from "@/utils/converter";

type Props = {
  isFrom: boolean;
  title: string;
  list: string[];
};

export default function TypeContainer({ isFrom, title, list }: Props) {
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
            <img
              src={getTypeIcon(getTypeEn(t))}
              key={t}
              className="w-[40px] h-[40px]"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">없음</p>
      )}
    </section>
  );
}
