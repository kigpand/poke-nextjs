import Header from "@/components/home/Header";
import PokemonLists from "@/components/home/PokemonLists";
import pokemonList from "@/json/pokemonList.json";
import ListProvider from "@/provider/ListProvider";
import { convertPokeData } from "@/utils/converter";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center relative">
      <Header />
      <ListProvider pokemonList={convertPokeData(pokemonList)}>
        <PokemonLists />
      </ListProvider>
    </main>
  );
}
