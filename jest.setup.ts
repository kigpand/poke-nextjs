import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/navigation", () => {
  const push = jest.fn();
  const replace = jest.fn();
  const back = jest.fn();
  const forward = jest.fn();
  const prefetch = jest.fn();

  return {
    // App Router 훅 mocking
    useRouter: () => ({ push, replace, back, forward, prefetch }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
  };
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props),
}));
