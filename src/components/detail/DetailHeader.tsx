import { IPokemon } from "@/interface/IPokemon";
import { ChevronLeft, ChevronRight, Home, Sparkles } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

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
      <nav className="flex items-center w-full flex-col gap-4 md:gap-0 md:flex-row">
        <div className="flex gap-1 w-full justify-end md:w-auto">
          <Link
            href="/"
            className={buttonVariants({ variant: "secondary", size: "icon" })}
            aria-label="홈으로"
          >
            <Home className="h-4 w-4" />
          </Link>
          <Link
            href={prevHref}
            aria-disabled={!prevId}
            tabIndex={prevId ? 0 : -1}
            className={buttonVariants({
              variant: "secondary",
              size: "icon",
              className: !prevId && "pointer-events-none opacity-30",
            })}
            aria-label="이전"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href={nextHref}
            aria-disabled={!nextId}
            tabIndex={nextId ? 0 : -1}
            className={buttonVariants({
              variant: "secondary",
              size: "icon",
              className: !nextId && "pointer-events-none opacity-30",
            })}
            aria-label="다음"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex gap-2 items-center w-full justify-between md:w-auto md:ml-4 md:justify-start">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/0 px-3 py-1 text-sm font-medium text-primary">
            {`#${pokemon.id.toString().padStart(4, "0")}`}
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            <span className="capitalize">{pokemon.name}</span>
            <span className="ml-3 align-middle text-base font-normal text-muted-foreground">
              {pokemon.genus}
            </span>
          </h1>
        </div>
      </nav>

      <div className="flex items-center w-full justify-end gap-2 md:w-auto">
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
      </div>
    </header>
  );
}
