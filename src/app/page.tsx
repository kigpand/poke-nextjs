import Header from "@/components/home/Header";
import PokemonLists from "@/components/home/PokemonLists";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center relative">
      <Header />
      <PokemonLists />
    </main>
  );
}
