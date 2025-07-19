import { RefObject } from "react";
import list from "@/json/pokemonList.json";
import { convertOnePoke } from "./converter";

export function handleSearch(
  searchRef: RefObject<HTMLInputElement | null>,
  callback: any
) {
  if (!searchRef.current) return;
  const isNaN = Number.isNaN(Number(searchRef.current!.value));
  const item = isNaN
    ? list.find((item) => item.name === searchRef.current?.value)
    : list.find((item) => item.id === Number(searchRef.current?.value));
  if (item) {
    const pokemon = convertOnePoke(item);
    callback(pokemon);
  } else {
    alert("올바른 도감번호를 입력해주세요.");
  }

  searchRef.current!.value = "";
}
