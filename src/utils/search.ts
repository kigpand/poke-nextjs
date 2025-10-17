import { RefObject } from "react";
import { toast } from "sonner";

export async function handleSearch(
  searchRef: RefObject<HTMLInputElement | null>,
  callback: any
) {
  if (!searchRef.current) return;
  const value = searchRef.current.value;
  const res = await fetch(`/api/search?value=${value}`);
  const data = await res.json();
  if (data) callback(data);
  else {
    toast.error("올바른 도감 번호 또는 포켓몬 명을 입력해주세요", {
      duration: 1000,
    });
  }
  searchRef.current.value = "";
}
