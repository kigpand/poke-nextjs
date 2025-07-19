import { createPortal } from "react-dom";
import React from "react";

type Props = {
  component: React.ReactNode;
  handleCloseModal: () => void;
};

export default function ModalPortal({ component, handleCloseModal }: Props) {
  return createPortal(
    <section className="fixed top-0 left-0 w-screen h-full min-h-screen bg-black/40 flex items-center justify-center animate-fade-in">
      {component}
      <div
        className="absolute top-0 left-0 z-[-1] w-full h-full hover:cursor-pointer"
        onClick={handleCloseModal}
      ></div>
    </section>,
    document.getElementById("overlay-root")!
  );
}
