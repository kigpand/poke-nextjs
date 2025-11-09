import AbilityLists from "@/components/abilities/AbilityLists";
import { buttonVariants } from "@/components/ui/button";
import abilities from "@/json/ability.json";
import { Home } from "lucide-react";
import Link from "next/link";

export default function Ability() {
  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-10">
      <header className="flex justify-between">
        <div className="mb-6 md:mb-8 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            포켓몬 특성
          </h1>
          <p className="text-sm text-muted-foreground">
            총 {abilities.length}개의 특성을 확인하고 검색해보세요.
          </p>
        </div>

        <Link
          href="/"
          aria-label="홈으로"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <Home aria-hidden="true" className="h-4 w-4" />
        </Link>
      </header>

      <AbilityLists abilities={abilities} />
    </main>
  );
}
