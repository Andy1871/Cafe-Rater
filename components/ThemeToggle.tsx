"use client";

import * as React from "react";

function getInitialDark(): boolean {
  // Runs only on client when called inside the lazy initializer
  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  // Mark mounted (prevents server/client first-render mismatch)
  React.useEffect(() => {
    setMounted(true);
    setDark(getInitialDark());
  }, []);

  // Apply theme + persist (client only, after state changes)
  React.useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  function toggle() {
    setDark((d) => !d);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/8 dark:focus:ring-violet-500/40"
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {/* Keep SSR + first client render stable */}
      {!mounted ? "Theme" : dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
