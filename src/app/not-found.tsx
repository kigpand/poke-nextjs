import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h3
        className="text-3xl font-bold text-red-600"
        aria-label="페이지를 찾을 수 없습니다"
      >
        404
      </h3>

      <p className="mt-4 text-lg font-medium">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        주소가 잘못되었거나, 삭제된 페이지일 수 있어요.
      </p>

      <Button asChild className="mt-6">
        <Link href="/" aria-label="홈으로 돌아가기">
          홈으로 돌아가기
        </Link>
      </Button>
    </main>
  );
}
