import pokemonList from "@/json/pokemonList.json";

type SearchParams = {
  id: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Detail({ searchParams }: Props) {
  const params = await searchParams;
  const pokemon = pokemonList.find((poke) => poke.id === Number(params.id));

  if (!pokemon) return <div>오류가 발생했습니다.</div>;

  return <main className="">{pokemon.name}</main>;
}
