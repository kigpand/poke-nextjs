"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ThreeCanvas } from "@/components/three";
import { useRouteLoadingStore } from "@/store/routeLoadingStore";

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const isNavigating = useRouteLoadingStore((state) => state.isNavigating);
  const setNavigating = useRouteLoadingStore((state) => state.setNavigating);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isNavigating) return;
    const now = Date.now();
    if (!startTimeRef.current) startTimeRef.current = now;
    const elapsed = now - startTimeRef.current;
    const minDurationMs = 300;
    const delay = Math.max(0, minDurationMs - elapsed);
    const timer = window.setTimeout(() => {
      setNavigating(false);
      startTimeRef.current = null;
    }, delay);
    return () => window.clearTimeout(timer);
  }, [pathname, isNavigating, setNavigating]);

  useEffect(() => {
    if (isNavigating) startTimeRef.current = Date.now();
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-black/20 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-background/95 px-6 py-5 shadow-lg">
        <div className="h-24 w-24">
          <ThreeCanvas className="h-full w-full" />
        </div>
        <span className="text-sm text-muted-foreground">
          상세 페이지로 이동 중...
        </span>
      </div>
    </div>
  );
}
