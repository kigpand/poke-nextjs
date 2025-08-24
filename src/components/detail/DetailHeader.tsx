import { IPokemon } from "@/interface/IPokemon";
import { ChevronLeft, ChevronRight, Home, Sparkles } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  pokemon: IPokemon;
  prevId?: number;
  nextId?: number;
  hasMega?: boolean;
  isMega?: boolean;
};

export default function DetailHeader({
  pokemon,
  prevId,
  nextId,
  hasMega,
  isMega,
}: Props) {
  const prevHref = `?id=${prevId}`;
  const nextHref = `?id=${nextId}`;
  const toggleMegaHref = `?id=${pokemon.id}&isMega=${
    isMega ? "false" : "true"
  }`;

  return (
    <header className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
      <nav className="flex items-center gap-2">
        <Link href="/">
          <Button
            variant="secondary"
            size="icon"
            aria-label="홈으로"
            className="cursor-pointer"
          >
            <Home className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={prevHref}>
          <Button
            variant="secondary"
            size="icon"
            aria-label="이전"
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={nextHref}>
          <Button
            variant="secondary"
            size="icon"
            aria-label="다음"
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
        <div className="ml-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/0 px-3 py-1 text-sm font-medium text-primary">
          {`#${pokemon.id.toString().padStart(4, "0")}`}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          <span className="capitalize">{pokemon.name}</span>
          <span className="ml-3 align-middle text-base font-normal text-muted-foreground">
            {pokemon.genus}
          </span>
        </h1>
      </nav>

      <span className="flex items-center gap-2">
        {hasMega && (
          <Link
            href={toggleMegaHref}
            aria-pressed={!!isMega}
            aria-label="메가진화 전환"
            title="메가진화 전환"
            className={`min-w-28 cursor-pointer flex items-center shadow-xs h-9 rounded-md px-4 py-2 ${
              isMega
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isMega ? "일반 폼" : "메가 폼"}
          </Link>
        )}

        <BookmarkButton pokemon={pokemon} />
      </span>
    </header>
  );
}
