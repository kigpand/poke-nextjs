import AboutCard from "@/components/detail/AboutCard";
import DetailHeader from "@/components/detail/DetailHeader";
import ImageCard from "@/components/detail/ImageCard";
import StatCard from "@/components/detail/StatCard";
import TabWrapper from "@/components/detail/TabWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import pokemonList from "@/json/pokemonList.json";
import { convertOnePoke } from "@/utils/converter";

type SearchParams = {
  id: string;
  isMega?: boolean;
  isDymax?: boolean;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Detail({ searchParams }: Props) {
  const params = await searchParams;
  const find = pokemonList.find((poke) => poke.id === Number(params.id));

  if (!find) return <div>오류가 발생했습니다.</div>;
  const pokemon = convertOnePoke(find);

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        {/* Header */}
        <DetailHeader pokemon={pokemon} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <ImageCard pokemon={pokemon} />
            <AboutCard pokemon={pokemon} />
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <StatCard pokemon={pokemon} />
            <TabWrapper pokemon={pokemon} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
