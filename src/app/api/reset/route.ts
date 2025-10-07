import pokemonList from "@/json/pokemonList.json";
import { convertPokeData } from "@/utils/converter";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(convertPokeData(pokemonList));
}
