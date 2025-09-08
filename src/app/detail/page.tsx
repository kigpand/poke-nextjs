import AboutCard from "@/components/detail/AboutCard";
import ImageCard from "@/components/detail/ImageCard";
import StatCard from "@/components/detail/StatCard";
import TabWrapper from "@/components/detail/TabWrapper";
import pokemonList from "@/json/pokemonList.json";
import megaList from "@/json/mega.json";
import { convertOnePoke } from "@/utils/converter";
import DetailHeader from "@/components/detail/DetailHeader";
import { notFound } from "next/navigation";

type SearchParams = {
  id: string;
  isMega?: string;
};
type Props = { searchParams: Promise<SearchParams> };

export default async function Detail({ searchParams }: Props) {
  const params = await searchParams;
  const idNum = Number(params.id);
  const isMega = params.isMega && params.isMega === "true";

  const find = pokemonList.find((poke) => poke.id === Number(params.id));
  if (!find) {
    return notFound();
  }

  let pokemon = convertOnePoke(find);
  if (isMega) {
    const mega = megaList.find((m) => m.id === idNum);
    if (mega) {
      const src = `/api/poke-image?url=${encodeURIComponent(mega.imageUrl)}`;
      pokemon = convertOnePoke({
        ...mega,
        imageUrl: src,
        flavor: find.flavor,
        generate: find.generate,
      });
    }
  }

  const idx = pokemonList.findIndex((p) => p.id === idNum);
  const prevId = idx > 0 ? pokemonList[idx - 1].id : undefined;
  const nextId =
    idx < pokemonList.length - 1 ? pokemonList[idx + 1].id : undefined;

  const hasMega = megaList.some((m) => m.id === idNum);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <DetailHeader
        pokemon={pokemon}
        prevId={prevId}
        nextId={nextId}
        hasMega={hasMega}
        isMega={!!isMega}
      />
      <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <ImageCard pokemon={pokemon} />
          <AboutCard pokemon={pokemon} />
        </div>
        <div className="md:col-span-7 lg:col-span-8">
          <StatCard pokemon={pokemon} />
          <TabWrapper pokemon={pokemon} />
        </div>
      </section>
    </main>
  );
}
