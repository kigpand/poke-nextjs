"use client";

import { IPokemon } from "@/interface/IPokemon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { getColor, getLineColor } from "@/utils/converter";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
} from "recharts";

type Props = {
  pokemon: IPokemon;
};

function StatRow({ label, value }: { label: string; value: number }) {
  const pct = Math.min(100, Math.round((value / 200) * 100));
  return (
    <div className="grid grid-cols-12 items-center gap-3">
      <div className="col-span-4 text-sm text-muted-foreground">{label}</div>
      <div className="col-span-2 font-medium tabular-nums">{value}</div>
      <div className="col-span-6">
        <Progress value={pct} className="h-2" />
      </div>
    </div>
  );
}

function StatsRadar({ p }: { p: IPokemon }) {
  const strokeColor = getLineColor(p.types ? p.types[0] : "");
  const fillColor = getColor(p.types ? p.types[0] : "");

  const data = [
    { stat: "HP", val: p.hp },
    { stat: "공격", val: p.attack },
    { stat: "방어", val: p.defense },
    { stat: "특수공격", val: p.specialAttack },
    { stat: "특수방어", val: p.specialDefense },
    { stat: "스피드", val: p.speed },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="80%">
          <PolarGrid />
          {/* 각 축의 라벨 */}
          <PolarAngleAxis dataKey="stat" />
          {/* 반지름(값) 축의 범위 고정 */}
          <PolarRadiusAxis domain={[0, 200]} tickCount={6} tick={false} />
          <Radar
            dataKey="val"
            stroke={strokeColor}
            fill={fillColor}
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function StatCard({ pokemon }: Props) {
  return (
    <Card
      className="mb-6"
      style={{
        borderColor: getLineColor(pokemon.types ? pokemon.types[0] : ""),
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          Base Stats
          <div className="text-sm font-normal text-muted-foreground">
            Total: {pokemon.allStat}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <StatRow label="HP" value={pokemon.hp} />
            <StatRow label="공격" value={pokemon.attack} />
            <StatRow label="방어" value={pokemon.defense} />
            <StatRow label="특수공격" value={pokemon.specialAttack} />
            <StatRow label="특수방어" value={pokemon.specialDefense} />
            <StatRow label="스피드" value={pokemon.speed} />
          </div>
          <div className="rounded-2xl border p-3">
            <StatsRadar p={pokemon} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
