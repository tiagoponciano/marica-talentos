import { useCallback, useEffect, useMemo, useState } from "react";
import type { EapNode } from "@/data/eap";
import {
  collectDescendantCodes,
  findNode,
  getBlockingAncestor,
} from "@/data/eap";

const STORAGE_KEY = "eap-completed-codes";

function loadCompletedCodes(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((c): c is string => typeof c === "string");
  } catch {
    return [];
  }
}

function saveCompletedCodes(codes: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
}

export function useCompletedNodes() {
  const [completedCodesList, setCompletedCodesList] =
    useState<string[]>(loadCompletedCodes);

  const completedCodes = useMemo(
    () => new Set(completedCodesList),
    [completedCodesList],
  );

  useEffect(() => {
    saveCompletedCodes(completedCodesList);
  }, [completedCodesList]);

  const completeNode = useCallback((node: EapNode) => {
    setCompletedCodesList((prev) =>
      prev.includes(node.code) ? prev : [...prev, node.code],
    );
  }, []);

  const restoreNode = useCallback((code: string) => {
    const node = findNode(code);
    if (!node) return;

    const toRemove = new Set(collectDescendantCodes(node));
    setCompletedCodesList((prev) =>
      prev.filter((item) => !toRemove.has(item)),
    );
  }, []);

  const isExplicitlyCompleted = useCallback(
    (code: string) => completedCodes.has(code),
    [completedCodes],
  );

  const canRestore = useCallback(
    (code: string) => {
      if (!completedCodes.has(code)) return false;
      const blocking = getBlockingAncestor(code, completedCodes);
      return !blocking || blocking === code;
    },
    [completedCodes],
  );

  const clearAll = useCallback(() => {
    setCompletedCodesList([]);
  }, []);

  return {
    completedCodes,
    completeNode,
    restoreNode,
    isExplicitlyCompleted,
    canRestore,
    clearAll,
  };
}
