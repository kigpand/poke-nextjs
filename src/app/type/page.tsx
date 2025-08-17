import TypeContainer from "@/components/pokeType/TypeContainer";
import { Button } from "@/components/ui/button";
import typeList from "@/json/types.json";
import { getTypeIcon, typeConvertDamegeData } from "@/utils/converter";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SearchParams = {
  type: string;
};

type Props = { searchParams: Promise<SearchParams> };

export default async function Type({ searchParams }: Props) {
  const params = await searchParams;
  const type = params.type;
  const normalized = (type || "").toLowerCase();
  const findType = typeList.find((list) => list.name === normalized);

  if (!findType) return <div>잘못된 타입이당</div>;
  const convertType = typeConvertDamegeData(findType);

  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-10">
      <header className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <Image
            width={25}
            height={25}
            src={getTypeIcon(convertType.name)}
            alt="img"
            className="icon"
          />
          <h1 className="text-3xl font-extrabold tracking-tight">
            {convertType.name} 타입
          </h1>
        </div>
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
      </header>
      <article className="flex gap-4">
        <div className="flex flex-col gap-6 w-full">
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
        </div>
        <div className="flex flex-col gap-6 w-full">
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
        </div>
      </article>
    </main>
  );
}
