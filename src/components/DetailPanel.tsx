import { ArrowRight, Check, CheckCircle2, Layers, Package, RotateCcw } from "lucide-react";
import type { EapNode } from "@/data/eap";
import {
  getBlockingAncestor,
  getNodeType,
  isNodeHidden,
  isWorkPackage,
} from "@/data/eap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  node: EapNode;
  viewMode: "active" | "completed";
  onSelectChild: (code: string) => void;
  isExplicitlyCompleted: boolean;
  completedCodes: ReadonlySet<string>;
  onComplete: (node: EapNode) => void;
  onRestore: (code: string) => void;
  canRestore: boolean;
}

export function DetailPanel({
  node,
  viewMode,
  onSelectChild,
  isExplicitlyCompleted,
  completedCodes,
  onComplete,
  onRestore,
  canRestore,
}: DetailPanelProps) {
  const nodeType = getNodeType(node);
  const isLeaf = isWorkPackage(node);
  const isHiddenInActive =
    viewMode === "active" && isNodeHidden(node.code, completedCodes);
  const blockingAncestor = getBlockingAncestor(node.code, completedCodes);

  const visibleChildren =
    node.children?.filter(
      (child) =>
        viewMode === "completed" ||
        !isNodeHidden(child.code, completedCodes),
    ) ?? [];

  if (isHiddenInActive && isExplicitlyCompleted) {
    return (
      <Card className="h-full border-slate-200/80 shadow-elevated dark:shadow-elevated-dark">
        <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-brand-500 dark:text-brand-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Item concluído
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium text-brand-600 dark:text-brand-400">
                {node.code}
              </span>{" "}
              foi removido da árvore principal. Veja na aba{" "}
              <span className="font-medium">Concluídos</span>.
            </p>
          </div>
          {canRestore && (
            <Button variant="outline" size="sm" onClick={() => onRestore(node.code)}>
              <RotateCcw className="h-4 w-4" />
              <span className="ml-2">Restaurar item</span>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-slate-200/80 shadow-elevated dark:shadow-elevated-dark">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {node.code}
            </p>
            <CardTitle className="text-xl leading-tight text-slate-900 dark:text-slate-100">
              {node.name}
            </CardTitle>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
              isExplicitlyCompleted
                ? "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600"
                : isLeaf
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-800"
                  : "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-400 dark:ring-sky-800",
            )}
          >
            {isExplicitlyCompleted ? (
              "Concluído"
            ) : isLeaf ? (
              <Package className="h-3.5 w-3.5" />
            ) : (
              <Layers className="h-3.5 w-3.5" />
            )}
            {!isExplicitlyCompleted && nodeType}
          </span>
        </div>
        <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {node.description}
        </CardDescription>

        <div className="flex flex-wrap gap-2 pt-2">
          {viewMode === "active" &&
            !isHiddenInActive &&
            !isExplicitlyCompleted &&
            node.code !== "0" && (
              <Button size="sm" onClick={() => onComplete(node)}>
                <Check className="h-4 w-4" />
                <span className="ml-2">Marcar como concluído</span>
              </Button>
            )}
          {isExplicitlyCompleted && canRestore && (
            <Button variant="outline" size="sm" onClick={() => onRestore(node.code)}>
              <RotateCcw className="h-4 w-4" />
              <span className="ml-2">Restaurar</span>
            </Button>
          )}
          {isHiddenInActive && !isExplicitlyCompleted && blockingAncestor && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Oculto porque o item{" "}
              <button
                type="button"
                className="font-medium text-brand-600 underline dark:text-brand-400"
                onClick={() => onSelectChild(blockingAncestor)}
              >
                {blockingAncestor}
              </button>{" "}
              está concluído.
            </p>
          )}
        </div>
      </CardHeader>

      {visibleChildren.length > 0 && !isHiddenInActive && (
        <CardContent>
          <h4 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
            Subitens
          </h4>
          <ul className="space-y-2">
            {visibleChildren.map((child) => (
              <li key={child.code}>
                <button
                  type="button"
                  onClick={() => onSelectChild(child.code)}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3 text-left transition-colors hover:border-brand-200 hover:bg-brand-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
                >
                  <div>
                    <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {child.code}
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {child.name}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}
