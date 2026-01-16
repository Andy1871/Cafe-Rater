"use client";

import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

type DropdownProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: readonly T[];
  onChange: (next: T[]) => void;
  placeholder?: string;
};

export default function Dropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  placeholder,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  function toggleOption(option: T) {
    const allOption = options[0];
    const allRealOptions = options.slice(1) as T[];

    const isAll = option === allOption;
    const isSelected = value.includes(option);
    const hasAllSelected = allRealOptions.every((opt) => value.includes(opt));

    let next: T[];

    if (isAll) {
      next = hasAllSelected ? [] : allRealOptions;
    } else {
      next = isSelected ? value.filter((v) => v !== option) : [...value, option];
    }

    onChange(next);
  }

  let buttonText: string | undefined;
  if (value.length === 0) {
    buttonText = placeholder;
  } else if (value.length === 1) {
    buttonText = value[0];
  } else if (
    value.length === options.length - 1 &&
    !value.includes(options[0])
  ) {
    buttonText = `All ${label}s`;
  } else {
    buttonText = `${value.length} ${label}s`;
  }

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative w-full text-left">
      <div className="mb-1 px-1 text-xs font-semibold tracking-wide text-amber-900/70 dark:text-zinc-400">
        {label}
      </div>

      <button
        type="button"
        className="inline-flex w-full items-center justify-between rounded-xl border border-amber-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-white/80 hover:border-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:border-white/10 dark:bg-white/4 dark:text-zinc-100 dark:hover:bg-white/6 dark:focus:ring-violet-500/40"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
      >
        <span className="truncate">{buttonText ?? "Select"}</span>
        <FaCaretDown
          className={`ml-2 shrink-0 text-zinc-700/70 transition dark:text-white/70 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu - CAN I SORT CAFES & LOCATIONS INTO ALPHABETICAL ORDER - WITHOUT AFFECTING RATINGS*/}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full overflow-hidden rounded-2xl border border-amber-200/70 bg-white/90 shadow-xl ring-1 ring-black/5 z-50 dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-2xl dark:shadow-black/30 dark:ring-black/20">
          <ul className="max-h-100 overflow-auto py-1"> 
            {options.map((option) => {
              const isSelected = value.includes(option);
              return (
                <li
                  key={option}
                  className={[
                    "cursor-pointer px-4 py-2 text-sm text-zinc-900 hover:bg-amber-50 flex items-center justify-between",
                    isSelected ? "bg-amber-50" : "",
                    "dark:text-zinc-100 dark:hover:bg-white/6",
                    isSelected ? "dark:bg-white/6" : "",
                  ].join(" ")}
                  onClick={() => toggleOption(option)}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && (
                    <span
                      className="text-xs font-semibold text-amber-700 dark:text-violet-300"
                      aria-hidden
                    >
                      ✓
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
