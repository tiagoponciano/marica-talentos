import { CheckCircle2, FolderKanban, ListTree, Package, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  phases: number;
  workPackages: number;
  totalItems: number;
  completedWorkPackages: number;
  completionPercent: number;
}

const items: SummaryItem[] = [
  {
    key: "phases",
    label: "Fases (nível 2)",
    icon: FolderKanban,
    color:
      "text-sky-600 bg-sky-50 ring-sky-100 dark:text-sky-400 dark:bg-sky-950/50 dark:ring-sky-900",
  },
  {
    key: "packages",
    label: "Pacotes de trabalho",
    icon: Package,
    color:
      "text-emerald-600 bg-emerald-50 ring-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/50 dark:ring-emerald-900",
  },
  {
    key: "completed",
    label: "Pacotes concluídos",
    icon: CheckCircle2,
    color:
      "text-brand-600 bg-brand-50 ring-brand-100 dark:text-brand-400 dark:bg-brand-950/50 dark:ring-brand-900",
  },
  {
    key: "percent",
    label: "Progresso",
    icon: Percent,
    color:
      "text-amber-600 bg-amber-50 ring-amber-100 dark:text-amber-400 dark:bg-amber-950/50 dark:ring-amber-900",
    format: (v: number) => `${v}%`,
  },
  {
    key: "total",
    label: "Total de itens",
    icon: ListTree,
    color:
      "text-violet-600 bg-violet-50 ring-violet-100 dark:text-violet-400 dark:bg-violet-950/50 dark:ring-violet-900",
  },
] ;

type SummaryItem = {
  key: string;
  label: string;
  icon: typeof FolderKanban;
  color: string;
  format?: (v: number) => string;
};

export function SummaryCards({
  phases,
  workPackages,
  totalItems,
  completedWorkPackages,
  completionPercent,
}: SummaryCardsProps) {
  const values: Record<string, number> = {
    phases,
    packages: workPackages,
    completed: completedWorkPackages,
    percent: completionPercent,
    total: totalItems,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => {
        const { key, label, icon: Icon, color } = item;
        const format = "format" in item ? item.format : undefined;
        return (
        <Card key={key} className="overflow-hidden">
          <CardContent className="flex items-center gap-4 p-5">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${color}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {format ? format(values[key]) : values[key]}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {label}
              </p>
            </div>
          </CardContent>
        </Card>
        );
      })}
    </div>
  );
}
