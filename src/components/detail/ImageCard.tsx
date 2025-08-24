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
