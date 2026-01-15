"use client";

import { useMemo, useState } from "react";

export function ThemeToggle() {
  const initialDark = useMemo(() => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  }, []);

  const [dark, setDark] = useState(initialDark);

  // Apply theme class (safe on client)
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", dark);
  }

  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/8 dark:focus:ring-violet-500/40"
      aria-label="Toggle theme"
    >
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
