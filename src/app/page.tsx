import Header from "@/components/home/Header";
import PokemonLists from "@/components/home/PokemonLists";
import pokemonList from "@/json/pokemonList.json";
import StoreProvider from "@/provider/StoreProvider";
import { convertPokeData } from "@/utils/converter";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center relative">
      <Header />
      <StoreProvider pokemonList={convertPokeData(pokemonList)}>
        <PokemonLists />
      </StoreProvider>
    </main>
  );
}
