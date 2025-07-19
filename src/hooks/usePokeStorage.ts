import { IPokemon } from "@/interface/IPokemon";
import { useCallback } from "react";

export function usePokeStorage() {
  const setCurrentPokeStorage = useCallback(
    (list: IPokemon) => {
      sessionStorage.setItem("currentPoke", JSON.stringify(list));
      if (!location.pathname.includes("detail")) {
      }
    },
    [location]
  );

  const getCurrentPokeStorage = useCallback(() => {
    const item = sessionStorage.getItem("currentPoke");
    return item ? JSON.parse(item) : null;
  }, []);

  const clearCurrentPokeStorage = useCallback(() => {
    sessionStorage.removeItem("currentPoke");
  }, []);

  return {
    setCurrentPokeStorage,
    clearCurrentPokeStorage,
    getCurrentPokeStorage,
  };
}
