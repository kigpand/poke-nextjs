import { RefObject } from "react";

export async function handleSearch(
  searchRef: RefObject<HTMLInputElement | null>,
  callback: any
) {
  if (!searchRef.current) return;
  const value = searchRef.current.value;
  const res = await fetch(`/api/search?value=${value}`);
  const data = await res.json();
  if (data) callback(data);
  else alert("올바른 도감번호를 입력해주세요.");
  searchRef.current.value = "";
}
