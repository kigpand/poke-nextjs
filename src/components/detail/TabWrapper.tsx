"use client";

import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  getColor,
  getLineColor,
  getTextColor,
  getTypeKo,
  typeConvertDamegeData,
} from "@/utils/converter";
import { IPokemon } from "@/interface/IPokemon";
import { Badge } from "../ui/badge";
import { useMemo } from "react";
import TypeEffectiveness from "./TypeEffectiveness";
import { IServerType } from "@/interface/IServerType";

type Props = {
  pokemon: IPokemon;
  types: IServerType[];
};

// 2배, 반감, 0배에 같은 타입이 존재할 경우 해당 타입의 값을 필터링 해주는 함수
function filterType(typeObj: any) {
  if (typeObj.doubleFrom.length > 0) {
    for (let i = 0; i < typeObj.doubleFrom.length; i++) {
      const noFromItem = typeObj.noFrom.find(
        (item: string) => item === typeObj.doubleFrom[i]
      );
      const halfFromItem = typeObj.halfFrom.find(
        (item: string) => item === typeObj.doubleFrom[i]
      );
      if (noFromItem) {
        const doubleFrom = typeObj.doubleFrom.filter(
          (item: string) => item !== typeObj.doubleFrom[i]
        );
        typeObj.doubleFrom = [...doubleFrom];
      }
      if (halfFromItem) {
        const doubleFrom = typeObj.doubleFrom.filter(
          (item: string) => item !== typeObj.doubleFrom[i]
        );
        const halfFrom = typeObj.halfFrom.filter(
          (item: string) => item !== typeObj.doubleFrom[i]
        );
        typeObj.doubleFrom = [...doubleFrom];
        typeObj.halfFrom = [...halfFrom];
      }
    }
  }
  if (typeObj.halfFrom.length > 0) {
    for (let i = 0; i < typeObj.halfFrom.length; i++) {
      const noFromItem = typeObj.noFrom.find(
        (item: string) => item === typeObj.halfFrom[i]
      );
      if (noFromItem) {
        const halfFrom = typeObj.halfFrom.filter(
          (item: string) => item !== typeObj.halfFrom[i]
        );
        typeObj.halfFrom = [...halfFrom];
      }
    }
  }
  return typeObj;
}

function TypeBadge({ type }: { type: string }) {
  const textColor = getTextColor(type);
  const fillColor = getColor(type);

  return (
    <Badge
      className={`rounded-full capitalize`}
      style={{ backgroundColor: fillColor, color: textColor }}
    >
      {getTypeKo(type)}
    </Badge>
  );
}

export default function TabWrapper({ pokemon, types }: Props) {
  const type = useMemo(() => {
    const initial = {
      doubleFrom: [] as string[],
      halfFrom: [] as string[],
      noFrom: [] as string[],
      doubleTo: [] as string[],
      halfTo: [] as string[],
      noTo: [] as string[],
    };

    const mergedType = pokemon.types?.reduce((acc, type) => {
      const result = types?.find((item) => item.name === type);
      if (!result) return acc;

      const converted = typeConvertDamegeData(result);

      return {
        doubleFrom: [...acc.doubleFrom, ...converted.doubleFrom],
        halfFrom: [...acc.halfFrom, ...converted.halfFrom],
        noFrom: [...acc.noFrom, ...converted.noFrom],
        doubleTo: [...acc.doubleTo, ...converted.doubleTo],
        halfTo: [...acc.halfTo, ...converted.halfTo],
        noTo: [...acc.noTo, ...converted.noTo],
      };
    }, initial);

    return filterType(mergedType);
  }, [pokemon]);

  return (
    <Tabs defaultValue="about">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="vs">상성</TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="mt-4">
        <Card
          style={{
            borderColor: getLineColor(pokemon.types ? pokemon.types[0] : ""),
          }}
        >
          <CardContent className="space-y-3 p-4">
            <div className="text-sm text-muted-foreground flex">
              <label className="w-10 font-bold">분류:</label>
              <span className="font-medium text-foreground">
                {pokemon.genus}
              </span>
            </div>
            <div className="text-sm text-muted-foreground flex">
              <label className="w-10 font-bold">세대:</label>
              <span className="font-medium text-foreground">
                {pokemon.generate}
              </span>
            </div>
            <div className="text-sm text-muted-foreground flex">
              <label className="w-10 font-bold">타입:</label>
              <ul className="flex gap-1">
                {pokemon.types?.map((t) => (
                  <li key={t} className="inline-block">
                    <TypeBadge type={t} />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vs" className="mt-4">
        <Card>
          <CardContent className="space-y-4 p-4">
            <label className="text-sm font-bold text-[#000000]">
              방어 상성
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              <TypeEffectiveness
                title="효과가 좋음"
                types={type.doubleFrom}
                value={2}
              />
              <TypeEffectiveness
                title="효과가 별로"
                types={type.halfFrom}
                value={0.5}
              />
              <TypeEffectiveness
                title="효과가 없음"
                types={type.noFrom}
                value={0}
              />
            </div>
            <div className="h-px w-full bg-border/60" />
            <label className="text-sm font-bold text-[#000000]">
              공격 상성
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              <TypeEffectiveness
                title="효과가 좋음"
                types={type.doubleTo}
                value={2}
              />
              <TypeEffectiveness
                title="효과가 별로"
                types={type.halfTo}
                value={0.5}
              />
              <TypeEffectiveness
                title="효과가 없음"
                types={type.noTo}
                value={0}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
