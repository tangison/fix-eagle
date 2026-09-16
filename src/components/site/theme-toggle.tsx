"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="inline-flex cursor-pointer items-center justify-center rounded-none p-2 transition-colors duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent-deep"
    >
      <Sun
        className="hidden h-[1.15rem] w-[1.15rem] dark:block"
        strokeWidth={1.5}
        aria-hidden
      />
      <Moon
        className="block h-[1.15rem] w-[1.15rem] dark:hidden"
        strokeWidth={1.5}
        aria-hidden
      />
    </button>
  );
}
