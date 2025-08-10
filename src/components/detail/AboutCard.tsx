import { Info, Ruler, Weight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { IPokemon } from "@/interface/IPokemon";
import abililty from "@/json/ability.json";

type Props = {
  pokemon: IPokemon;
};

export default function AboutCard({ pokemon }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5" /> About
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          {pokemon.flavor}
        </p>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 rounded-xl border p-3">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Height</div>
              <div className="font-semibold">
                {Math.round(pokemon.height * 10)} cm
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border p-3">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Weight</div>
              <div className="font-semibold">
                {+(pokemon.weight / 10).toFixed(1)} kg
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            특성
          </div>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ab) => (
              <Tooltip key={ab}>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {ab}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {abililty.find((abil) => abil.name === ab)?.text}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
