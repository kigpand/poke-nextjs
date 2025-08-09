import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getColor, getTextColor, getTypeKo } from "@/utils/converter";
import { IPokemon } from "@/interface/IPokemon";
import { Badge } from "../ui/badge";

type Props = {
  pokemon: IPokemon;
};

function TypeBadge({ type }: { type: string }) {
  const textColor = getTextColor(type);
  const fillColor = getColor(type);
  console.log(type);

  return (
    <Badge
      className={`rounded-full capitalize`}
      style={{ backgroundColor: fillColor, color: textColor }}
    >
      {getTypeKo(type)}
    </Badge>
  );
}

export default function TabWrapper({ pokemon }: Props) {
  return (
    <Tabs defaultValue="about">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="vs">상성</TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="mt-4">
        <Card>
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
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <label className="text-sm text-muted-foreground">상성</label>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
