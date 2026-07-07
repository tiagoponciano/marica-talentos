import { Check, ChevronRight, Circle, FolderTree, Package } from "lucide-react";
import type { EapNode } from "@/data/eap";
import { isWorkPackage } from "@/data/eap";
import { cn } from "@/lib/utils";

interface EapTreeProps {
  node: EapNode;
  selectedCode: string;
  onSelect: (code: string) => void;
  onComplete: (node: EapNode) => void;
  depth?: number;
}

export function EapTree({
  node,
  selectedCode,
  onSelect,
  onComplete,
  depth = 0,
}: EapTreeProps) {
  const isSelected = selectedCode === node.code;
  const hasChildren = Boolean(node.children?.length);
  const isLeaf = isWorkPackage(node);

  return (
    <div className="select-none">
      <div
        className="group/row flex items-start gap-1"
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        <button
          type="button"
          onClick={() => onSelect(node.code)}
          className={cn(
            "flex min-w-0 flex-1 items-start gap-2 rounded-lg border border-transparent px-3 py-2.5 text-left transition-all",
            "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:hover:bg-slate-800",
            isSelected &&
              "border-brand-200 bg-brand-50 shadow-sm ring-2 ring-brand-300/60 dark:border-brand-500/60 dark:bg-brand-500/20 dark:shadow-[0_0_0_1px_rgba(74,222,128,0.3)] dark:ring-brand-400",
          )}
        >
          <span className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-500">
            {isLeaf ? (
              <Package className="h-4 w-4 text-brand-500 dark:text-brand-400" />
            ) : hasChildren ? (
              <FolderTree className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            ) : (
              <Circle className="h-3 w-3" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span
              className={cn(
                "block text-xs font-semibold tracking-wide",
                isSelected
                  ? "text-brand-700 dark:text-brand-300"
                  : "text-slate-500 dark:text-slate-400",
              )}
            >
              {node.code}
            </span>
            <span
              className={cn(
                "block text-sm leading-snug",
                isSelected
                  ? "font-semibold text-slate-900 dark:text-white"
                  : "text-slate-700 dark:text-slate-300",
              )}
            >
              {node.name}
            </span>
          </span>
          {hasChildren && (
            <ChevronRight
              className={cn(
                "mt-1 h-4 w-4 shrink-0 text-slate-300 transition-transform dark:text-slate-600",
                isSelected && "text-brand-500 dark:text-brand-300",
              )}
            />
          )}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onComplete(node);
          }}
          disabled={node.code === "0"}
          title="Marcar como concluído"
          aria-label={`Marcar ${node.code} como concluído`}
          className={cn(
            "mt-2 shrink-0 rounded-md p-1.5 text-slate-400 transition-all",
            "hover:bg-emerald-50 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            "dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400",
            node.code === "0" && "invisible pointer-events-none",
          )}
        >
          <Check className="h-4 w-4" />
        </button>
      </div>

      {hasChildren && (
        <div className="relative">
          <div
            className="absolute bottom-2 top-0 w-px bg-slate-200 dark:bg-slate-700"
            style={{ left: `${depth * 16 + 22}px` }}
          />
          {node.children!.map((child) => (
            <EapTree
              key={child.code}
              node={child}
              selectedCode={selectedCode}
              onSelect={onSelect}
              onComplete={onComplete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
