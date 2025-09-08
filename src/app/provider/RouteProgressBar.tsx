"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteProgressBar() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // 경로 변경 시작 → 바 시작
  useEffect(() => {
    setVisible(true);
    setProgress(10);
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 10, 90)); // 90%까지 천천히
    }, 200);

    // 효과 클린업 시점 = 라우트 전환 완료
    return () => {
      if (timer.current) clearInterval(timer.current);
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
      setTimeout(() => setProgress(0), 400);
    };
  }, [pathname, search]); // 경로/검색쿼리 변경 트리거

  if (!visible) return null;
  return (
    <div className="fixed left-0 right-0 top-0 z-[9999] h-1 bg-transparent">
      <div
        style={{ width: `${progress}%` }}
        className="h-full transition-[width] duration-200 ease-out"
      />
      <style jsx>{`
        div > div {
          background: #22c55e;
        }
      `}</style>
    </div>
  );
}
