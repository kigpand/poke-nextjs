import types from "@/json/types.json";
import { typeConvertDamegeData } from "@/utils/converter";
import { useCallback } from "react";

export function useTypeStorage() {
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

  return { setTypeStorage, getTypeStorage, clearTypeStorage };
}
