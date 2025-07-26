"use client";

import { IPokemon } from "@/interface/IPokemon";
import { handleSearch } from "@/utils/search";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useRef } from "react";

export default function Search() {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(searchRef, (poke: IPokemon) =>
      router.push(`detail?id=${poke.id}`)
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center flex-col gap-4">
      <Image src="/img/logo.png" alt="logo" width={150} height={50} />
      <input
        type="text"
        className="border-none bg-gray-300 w-[200px] h-8 text-xs font-semibold rounded-2xl py-1 px-2 md:w-[300px]"
        ref={searchRef}
        placeholder="도감번호나 이름을 입력해주세요"
      />
    </form>
  );
}
