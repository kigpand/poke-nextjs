import { typeConvertDamegeData } from "@/utils/converter";
import { useCallback } from "react";
import types from "@/json/types.json";

export function usePokeStorage() {
  const setCurrentPokeStorage = useCallback(() => {}, []);

  const getCurrentPokeStorage = useCallback(() => {
    const item = sessionStorage.getItem("currentPoke");
    return item ? JSON.parse(item) : null;
  }, []);

  const clearCurrentPokeStorage = useCallback(() => {
    sessionStorage.removeItem("currentPoke");
  }, []);

  const setTypeStorage = useCallback((type: string) => {
    sessionStorage.setItem("type", type);
  }, []);

  const getTypeStorage = useCallback(() => {
    const sessionType = sessionStorage.getItem("type");
    if (!sessionType) return null;
    const type = types.find((type) => type.name === sessionType);
    return type ? typeConvertDamegeData(type) : null;
  }, []);

  const clearTypeStorage = useCallback(() => {
    sessionStorage.removeItem("type");
  }, []);

  return {
    setCurrentPokeStorage,
    setTypeStorage,
    clearCurrentPokeStorage,
    clearTypeStorage,
    getCurrentPokeStorage,
    getTypeStorage,
  };
}
