"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ThemeToggleButton() {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDarkMode = root.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    setIsDark(isDarkMode);
  };

  // useEffect 내에서 초기 로드 시 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <button
      className="w-[40px] h-[40px] bg-foreground cursor-pointer border border-gray-400 p-1 rounded-xl"
      onClick={toggleTheme}
    >
      <Image
        src={isDark ? "/img/sun.png" : "/img/moon.png"}
        alt="img"
        width={30}
        height={30}
      />
    </button>
  );
}
