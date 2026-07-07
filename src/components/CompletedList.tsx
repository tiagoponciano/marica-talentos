import { Archive, RotateCcw } from "lucide-react";
import type { EapNode } from "@/data/eap";
import { getNodeType } from "@/data/eap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CompletedListProps {
  items: EapNode[];
  selectedCode: string;
  onRestore: (code: string) => void;
  canRestore: (code: string) => boolean;
  onSelect: (code: string) => void;
}

export function CompletedList({
  items,
  selectedCode,
  onRestore,
  canRestore,
  onSelect,
}: CompletedListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
        <Archive className="h-10 w-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Nenhum item concluído ainda
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Marque itens na árvore principal com o ícone de check.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 p-1">
      {items.map((item) => {
        const restorable = canRestore(item.code);
        const isSelected = selectedCode === item.code;

        return (
          <li
            key={item.code}
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-all",
              isSelected
                ? "border-brand-300 bg-brand-50 shadow-sm ring-2 ring-brand-300/60 dark:border-brand-500/60 dark:bg-brand-500/20 dark:shadow-[0_0_0_1px_rgba(74,222,128,0.3)] dark:ring-brand-400"
                : "border-slate-100 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/50",
            )}
          >
            <button
              type="button"
              onClick={() => onSelect(item.code)}
              className="min-w-0 flex-1 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span
                className={cn(
                  "text-xs font-semibold",
                  isSelected
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-brand-600 dark:text-brand-400",
                )}
              >
                {item.code}
              </span>
              <p
                className={cn(
                  "text-sm font-medium",
                  isSelected
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-800 dark:text-slate-200",
                )}
              >
                {item.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {getNodeType(item)}
              </p>
            </button>
            <Button
              variant="outline"
              size="sm"
              disabled={!restorable}
              onClick={() => onRestore(item.code)}
              title={
                restorable
                  ? "Restaurar item"
                  : "Restaure o item pai concluído primeiro"
              }
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="ml-1.5 hidden sm:inline">Restaurar</span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
