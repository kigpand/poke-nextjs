import { IPokemon } from "@/interface/IPokemon";
import BookmarkButton from "./BookmarkButton";

type Props = {
  pokemon: IPokemon;
};
export default function DetailHeader({ pokemon }: Props) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/0 px-3 py-1 text-sm font-medium text-primary">
          {`#${pokemon.id.toString().padStart(4, "0")}`}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          <span className="capitalize">{pokemon.name}</span>
          <span className="ml-3 align-middle text-base font-normal text-muted-foreground">
            {pokemon.genus}
          </span>
        </h1>
      </div>
      <BookmarkButton pokemon={pokemon} />
    </div>
  );
}
