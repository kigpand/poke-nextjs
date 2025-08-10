import { getColor } from "@/utils/converter";
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

export default function TabTypeText({ title, types, value }: Props) {
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
    <article className="text-xs flex flex-col gap-3 items-center">
      <label className="font-bold">{title}</label>
      <ul className="flex flex-col gap-1">
        {typeList.map((item: ITypeText, i: number) => {
          return (
            <li
              className="flex justify-between p-1 w-20 rounded text-white"
              style={{ backgroundColor: getColor(item.text) }}
              key={i}
            >
              <strong>{item.text}</strong>
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
