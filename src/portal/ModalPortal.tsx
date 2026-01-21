"use client";

import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";

type Props = {
  component: React.ReactNode;
  handleCloseModal: () => void;
};

export default function ModalPortal({ component, handleCloseModal }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    }

    if (mounted) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleCloseModal, mounted]);

  if (!mounted) return null;

  const portalRoot = document.getElementById("overlay-root");
  if (!portalRoot) return null;

  return createPortal(
    <section className="fixed top-0 left-0 w-screen h-full min-h-screen bg-black/40 flex items-center justify-center">
      {component}
      <div
        className="absolute top-0 left-0 z-[-1] w-full h-full hover:cursor-pointer"
        onClick={handleCloseModal}
      ></div>
    </section>,
    portalRoot
  );
}
