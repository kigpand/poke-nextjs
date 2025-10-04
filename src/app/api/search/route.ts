import list from "@/json/pokemonList.json";
import { convertOnePoke } from "@/utils/converter";
import { NextResponse } from "next/server";

// 검색기능을 클라이언트에서 구현하면 클라이언트에 list json이 전송되야함.
// 해당 문제 처리위해 별도의 검색 api 생성
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("value");
  if (!search) return NextResponse.json(null);

  const isNum = !Number.isNaN(Number(search));
  const item = isNum
    ? list.find((item) => item.id === Number(search))
    : list.find((item) => item.name.toLowerCase() === search.toLowerCase());

  return NextResponse.json(item ? convertOnePoke(item) : null);
}
