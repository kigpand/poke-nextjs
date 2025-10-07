import TypeContainer from "@/components/pokeType/TypeContainer";
import { buttonVariants } from "@/components/ui/button";
import types from "@/json/types.json";
import { getTypeIcon, typeConvertDamegeData } from "@/utils/converter";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type SearchParams = {
  type: string;
};

type Props = { searchParams: Promise<SearchParams> };

export default async function Type({ searchParams }: Props) {
  const params = await searchParams;
  const type = params.type;
  const normalized = (type || "").toLowerCase();
  const findType = types.find((list) => list.name === normalized);

  if (!findType) {
    notFound();
  }

  const convertType = typeConvertDamegeData(findType);
  const iconSrc = getTypeIcon(convertType.name);
  const titleId = "type-title";

  return (
    <main
      className="mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-10"
      aria-labelledby={titleId}
    >
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image
            width={28}
            height={28}
            src={iconSrc}
            alt={`${convertType.name} 타입 아이콘`}
            className="w-7 h-7"
          />
          <h1
            id={titleId}
            aria-label="타입 설명입니다."
            className="text-3xl font-extrabold tracking-tight"
          >
            {convertType.name} 타입
          </h1>
        </div>
        <Link
          href="/"
          aria-label="홈으로"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <Home aria-hidden="true" className="h-4 w-4" />
        </Link>
      </header>
      <section className="flex gap-4">
        <article aria-labelledby="defense-title" className="w-full">
          <h3 id="defense-title" className="font-bold text-lg mb-2">
            방어 상성
          </h3>
          <ul role="list" className="flex flex-col gap-6 w-full">
            <TypeContainer
              isFrom={true}
              title="데미지를 받지 않음"
              list={convertType.noFrom}
            />
            <TypeContainer
              isFrom={true}
              title="0.5배 데미지를 입음"
              list={convertType.halfFrom}
            />
            <TypeContainer
              isFrom={true}
              title="2배 데미지를 입음"
              list={convertType.doubleFrom}
            />
          </ul>
        </article>
        <article aria-labelledby="offense-title" className="w-full">
          <h3 id="offense-title" className="font-bold text-lg mb-2">
            공격 상성
          </h3>
          <ul role="list" className="flex flex-col gap-6 w-full">
            <TypeContainer
              isFrom={false}
              title="데미지를 줄 수 없음"
              list={convertType.noTo}
            />
            <TypeContainer
              isFrom={false}
              title="0.5배 데미지를 줌"
              list={convertType.halfTo}
            />
            <TypeContainer
              isFrom={false}
              title="2배 데미지를 줌"
              list={convertType.doubleTo}
            />
          </ul>
        </article>
      </section>
    </main>
  );
}
