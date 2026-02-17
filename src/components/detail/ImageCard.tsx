import { IPokemon } from "@/interface/IPokemon";
import { Card, CardContent } from "../ui/card";
import { getLineColor, getTypeIcon } from "@/utils/converter";

type Props = {
  pokemon: IPokemon;
};

export default function ImageCard({ pokemon }: Props) {
  const typeIcon = getTypeIcon(pokemon.types ? pokemon.types[0] : "");

  return (
    <Card
      className="mb-6"
      style={{
        borderColor: getLineColor(pokemon.types ? pokemon.types[0] : ""),
      }}
    >
      <CardContent className="relative p-4">
        <div className="pointer-events-none absolute right-6 top-6 z-10 h-16 w-16 opacity-15">
          <img
            src={typeIcon}
            alt=""
            aria-hidden="true"
            className="h-full w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
        <img
          className="relative z-0 aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-muted/40 to-muted p-2"
          src={pokemon.imageUrl}
          alt={`${pokemon.name} 공식 아트워크`}
          referrerPolicy="no-referrer"
        />
      </CardContent>
    </Card>
  );
}
