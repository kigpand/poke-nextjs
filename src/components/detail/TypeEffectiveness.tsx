import { getColor, getTypeIcon, getTypeKo } from "@/utils/converter";
import { useMemo } from "react";

interface ITypeText {
  count: number;
  text: string;
}

type Props = {
  title: string;
  types: string[];
  value: number;
};

export default function TypeEffectiveness({ title, types, value }: Props) {
  const typeList = useMemo(() => {
    const map = new Map<string, ITypeText>();

    types.forEach((type) => {
      if (map.has(type)) {
        map.set(type, { text: type, count: 2 });
      } else {
        map.set(type, { text: type, count: 1 });
      }
    });

    return Array.from(map.values());
  }, [types]);

  return (
    <article className="text-xs flex flex-col gap-3">
      <label className="font-bold text-center">{title}</label>
      <ul className="grid gap-1">
        {typeList.length === 0 && (
          <li className="rounded-md border border-dashed px-2 py-1 text-center text-muted-foreground">
            없음
          </li>
        )}
        {typeList.map((item: ITypeText, i: number) => {
          return (
            <li
              className="flex items-center justify-between gap-2 rounded-md px-2 py-1 text-white"
              style={{ backgroundColor: getColor(item.text) }}
              aria-label={`${item.text}x${value / item.count}배`}
              key={i}
            >
              <span className="flex items-center gap-1">
                <img
                  src={getTypeIcon(item.text)}
                  alt=""
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  loading="lazy"
                  decoding="async"
                />
                <strong>{getTypeKo(item.text)}</strong>
              </span>
              <span>
                x
                {value === 2
                  ? value * item.count
                  : value === 0.5
                  ? value / item.count
                  : 0}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
