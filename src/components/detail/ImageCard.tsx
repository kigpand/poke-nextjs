import { IPokemon } from "@/interface/IPokemon";
import { Card, CardContent } from "../ui/card";
import { getLineColor } from "@/utils/converter";
import { MonsterBallCanvas } from "@/components/three";

type Props = {
  pokemon: IPokemon;
};

export default function ImageCard({ pokemon }: Props) {
  return (
    <Card
      className="mb-6"
      style={{
        borderColor: getLineColor(pokemon.types ? pokemon.types[0] : ""),
      }}
    >
      <CardContent className="relative p-4">
        <div className="pointer-events-none absolute right-3 top-3 h-20 w-20 opacity-85">
          <MonsterBallCanvas className="h-full w-full" />
        </div>
        <img
          className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-muted/40 to-muted p-2"
          src={pokemon.imageUrl}
          alt={`${pokemon.name} 공식 아트워크`}
          referrerPolicy="no-referrer"
        />
      </CardContent>
    </Card>
  );
}
