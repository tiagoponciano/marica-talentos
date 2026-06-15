import { useMemo, useState } from "react";
import { AlertCircle, TreePine } from "lucide-react";
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
  findNode,
  flattenNodes,
  isWorkPackage,
} from "@/data/eap";

export default function App() {
  const [selectedCode, setSelectedCode] = useState("0");

  const selectedNode = useMemo(
    () => findNode(selectedCode) ?? eapRoot,
    [selectedCode],
  );

  const allNodes = useMemo(() => flattenNodes(), []);
  const workPackages = useMemo(
    () => allNodes.filter(isWorkPackage),
    [allNodes],
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
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30">
              <CardTitle className="text-lg">Navegue pela EAP</CardTitle>
              <CardDescription>
                Clique em qualquer item para visualizar a legenda e os detalhes.
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[32rem] overflow-y-auto p-3">
              <EapTree
                node={eapRoot}
                selectedCode={selectedCode}
                onSelect={setSelectedCode}
              />
            </CardContent>
          </Card>

          <DetailPanel node={selectedNode} onSelectChild={setSelectedCode} />
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
