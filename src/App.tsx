import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, ListTree, TreePine } from "lucide-react";
import { CompletedList } from "@/components/CompletedList";
import { DetailPanel } from "@/components/DetailPanel";
import { EapTree } from "@/components/EapTree";
import { SummaryCards } from "@/components/SummaryCards";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PROJECT_DESCRIPTION,
  PROJECT_TITLE,
  SCOPE_NOTE,
  eapRoot,
  filterTree,
  findNode,
  flattenNodes,
  getExplicitlyCompletedNodes,
  isNodeHidden,
  isWorkPackage,
  type EapNode,
} from "@/data/eap";
import { useCompletedNodes } from "@/hooks/useCompletedNodes";
import { cn } from "@/lib/utils";

type ViewMode = "active" | "completed";

export default function App() {
  const [selectedCode, setSelectedCode] = useState("0");
  const [viewMode, setViewMode] = useState<ViewMode>("active");
  const {
    completedCodes,
    completeNode,
    restoreNode,
    isExplicitlyCompleted,
    canRestore,
  } = useCompletedNodes();

  const allNodes = useMemo(() => flattenNodes(), []);
  const workPackages = useMemo(
    () => allNodes.filter(isWorkPackage),
    [allNodes],
  );

  const visibleTree = useMemo(() => {
    const filtered = filterTree(eapRoot, completedCodes);
    return filtered ?? eapRoot;
  }, [completedCodes]);

  const completedNodesList = useMemo(
    () => getExplicitlyCompletedNodes(completedCodes),
    [completedCodes],
  );

  const completedWorkPackages = useMemo(
    () =>
      workPackages.filter((wp) => isNodeHidden(wp.code, completedCodes)).length,
    [workPackages, completedCodes],
  );

  const completionPercent = useMemo(() => {
    if (workPackages.length === 0) return 0;
    return Math.round((completedWorkPackages / workPackages.length) * 100);
  }, [completedWorkPackages, workPackages.length]);

  const selectedNode = useMemo(
    () => findNode(selectedCode) ?? eapRoot,
    [selectedCode],
  );

  useEffect(() => {
    if (
      viewMode === "active" &&
      selectedCode !== "0" &&
      isNodeHidden(selectedCode, completedCodes)
    ) {
      setSelectedCode("0");
    }
  }, [completedCodes, selectedCode, viewMode]);

  const handleComplete = useCallback(
    (node: EapNode) => {
      if (node.code === "0") return;
      completeNode(node);
      setSelectedCode("0");
    },
    [completeNode],
  );

  const handleRestore = useCallback(
    (code: string) => {
      restoreNode(code);
      setSelectedCode(code);
      setViewMode("active");
    },
    [restoreNode],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-brand-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20 dark:bg-brand-500 dark:shadow-brand-500/10">
                <TreePine className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  Estrutura Analítica do Projeto
                </p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                  {PROJECT_TITLE}
                </h1>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  {PROJECT_DESCRIPTION}
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <SummaryCards
          phases={eapRoot.children?.length ?? 0}
          workPackages={workPackages.length}
          totalItems={allNodes.length}
          completedWorkPackages={completedWorkPackages}
          completionPercent={completionPercent}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {viewMode === "active"
                      ? "Navegue pela EAP"
                      : "Itens concluídos"}
                  </CardTitle>
                  <CardDescription>
                    {viewMode === "active"
                      ? "Itens concluídos somem da árvore. Use o check para marcar."
                      : "Itens armazenados como concluídos. Restaure para voltar à árvore."}
                  </CardDescription>
                </div>
                <div className="flex shrink-0 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setViewMode("active")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      viewMode === "active"
                        ? "bg-brand-600 text-white shadow-sm dark:bg-brand-500"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800",
                    )}
                  >
                    <ListTree className="h-4 w-4" />
                    Em andamento
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("completed")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      viewMode === "completed"
                        ? "bg-brand-600 text-white shadow-sm dark:bg-brand-500"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800",
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Concluídos
                    {completedNodesList.length > 0 && (
                      <span
                        className={cn(
                          "ml-0.5 rounded-full px-1.5 py-0.5 text-xs",
                          viewMode === "completed"
                            ? "bg-white/20"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                        )}
                      >
                        {completedNodesList.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-h-[32rem] overflow-y-auto p-3">
              {viewMode === "active" ? (
                <EapTree
                  node={visibleTree}
                  selectedCode={selectedCode}
                  onSelect={setSelectedCode}
                  onComplete={handleComplete}
                />
              ) : (
                <CompletedList
                  items={completedNodesList}
                  selectedCode={selectedCode}
                  onRestore={handleRestore}
                  canRestore={canRestore}
                  onSelect={setSelectedCode}
                />
              )}
            </CardContent>
          </Card>

          <DetailPanel
            node={selectedNode}
            viewMode={viewMode}
            onSelectChild={setSelectedCode}
            isExplicitlyCompleted={isExplicitlyCompleted(selectedCode)}
            completedCodes={completedCodes}
            onComplete={handleComplete}
            onRestore={handleRestore}
            canRestore={canRestore(selectedCode)}
          />
        </div>

        <Card className="border-amber-200/80 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20">
          <CardContent className="flex gap-4 p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200">
                Nota de escopo
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-amber-800/90 dark:text-amber-300/90">
                {SCOPE_NOTE}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-slate-200/80 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        UFSC · EPS2351 · Associação Marica Talentos
      </footer>
    </div>
  );
}
