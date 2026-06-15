import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="shrink-0"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="ml-2 hidden sm:inline">
        {isDark ? "Modo claro" : "Modo escuro"}
      </span>
    </Button>
  );
}
