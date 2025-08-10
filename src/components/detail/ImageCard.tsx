import { IPokemon } from "@/interface/IPokemon";
import { Card, CardContent } from "../ui/card";
import { getLineColor } from "@/utils/converter";

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
      <CardContent className="p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-muted/40 to-muted p-2">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            referrerPolicy="no-referrer"
          />
        </div>
      </CardContent>
    </Card>
  );
}
