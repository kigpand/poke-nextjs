"use client";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { AbilityType } from "./AbilityLists";

type Props = {
  ability: AbilityType;
};

export default function AbilityListItem({ ability }: Props) {
  return (
    <li key={ability.id}>
      <Card className="h-full hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <CardTitle className="text-base md:text-lg font-semibold leading-snug">
            {ability.name}
          </CardTitle>
          <Badge variant="outline" className="text-[10px]">
            #{ability.id.toString().padStart(3, "0")}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
            {ability.text}
          </p>
        </CardContent>
      </Card>
    </li>
  );
}
