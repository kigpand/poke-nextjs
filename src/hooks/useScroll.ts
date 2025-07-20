"use client";
import { useCallback, useEffect, useState } from "react";

export function useScroll() {
  const [scroll, setScroll] = useState<number>(0);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 20
    ) {
      setScroll(window.scrollY);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return { scroll };
}
