import Link from "next/link";
import { SortButton, ThemeToggleButton, TypeButton } from "./button";
import Search from "./Search";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

export default function Header() {
  return (
    <header className="w-[90%] h-1/5 flex justify-between relative mb-2 py-7">
      <TypeButton />
      <Search />
      <div
        className="flex gap-1 items-start flex-wrap justify-end"
        style={{ alignContent: "flex-start" }}
      >
        <SortButton />
        <Link
          href="/bookmark"
          className="w-[40px] h-[40px] bg-background cursor-pointer border border-gray-400 p-1 rounded-xl hover:bg-gray-100"
        >
          <BsFillBookmarkPlusFill className="w-[30px] h-[30px]" />
        </Link>
        {/* <ThemeToggleButton /> */}
      </div>
    </header>
  );
}
