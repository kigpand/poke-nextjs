import Link from "next/link";
import { SortButton, TypeButton } from "./button";
import Search from "./Search";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import ListProvider from "@/context/ListProvider";
import pokemonList from "@/json/pokemonList.json";
import { convertPokeData } from "@/utils/converter";

export default function Header() {
  return (
    <header
      role="banner"
      aria-label="도감 배너 겸 헤더"
      className="w-[90%] h-[20vh] flex justify-center relative mb-2 py-7"
    >
      <Search />
      <div
        className="absolute right-0 w-[100px] flex gap-1 items-start flex-wrap justify-end"
        style={{ alignContent: "flex-start" }}
      >
        <ListProvider pokemonList={convertPokeData(pokemonList)}>
          <SortButton />
        </ListProvider>
        <Link
          aria-label="도감 페이지 이동 버튼"
          href="/bookmark"
          className="w-[40px] h-[40px] bg-background cursor-pointer border border-gray-400 p-1 rounded-xl hover:bg-gray-100"
        >
          <BsFillBookmarkPlusFill className="w-[30px] h-[30px]" />
        </Link>
        <TypeButton />
      </div>
    </header>
  );
}
