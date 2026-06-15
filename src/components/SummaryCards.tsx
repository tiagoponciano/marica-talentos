import { FolderKanban, ListTree, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  phases: number;
  workPackages: number;
  totalItems: number;
}

const items = [
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
    key: "total",
    label: "Total de itens",
    icon: ListTree,
    color:
      "text-violet-600 bg-violet-50 ring-violet-100 dark:text-violet-400 dark:bg-violet-950/50 dark:ring-violet-900",
  },
] as const;

export function SummaryCards({
  phases,
  workPackages,
  totalItems,
}: SummaryCardsProps) {
  const values = { phases, packages: workPackages, total: totalItems };

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map(({ key, label, icon: Icon, color }) => (
        <Card key={key} className="overflow-hidden">
          <CardContent className="flex items-center gap-4 p-5">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${color}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {values[key]}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
