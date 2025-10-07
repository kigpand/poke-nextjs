"use client";

import type { IServerType } from "@/interface/IServerType";
import { createContext } from "react";

export const TypeContext = createContext<IServerType[] | null>(null);

type Props = {
  type: IServerType[];
  children: React.ReactNode;
};

// 정렬 및 필터링용 provider. 원본 형식의 포켓몬 리스트를 context에 저장
export default function TypeProvider({ type, children }: Props) {
  return <TypeContext.Provider value={type}>{children}</TypeContext.Provider>;
}
