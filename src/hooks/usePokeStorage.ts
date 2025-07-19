import { useCallback } from "react";

export function usePokeStorage() {
  const setCurrentPokeStorage = useCallback(() => {}, []);

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
