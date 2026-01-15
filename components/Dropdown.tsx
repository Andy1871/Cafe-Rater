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
  } else if (value.length === options.length - 1 && !value.includes(options[0])) {
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
      <div className="mb-1 px-1 text-xs font-medium text-zinc-400">
        {label}
      </div>

      <button
        type="button"
        className="inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-zinc-100 shadow-sm transition hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
      >
        <span className="truncate text-zinc-100">
          {buttonText ?? "Select"}
        </span>
        <FaCaretDown className={`ml-2 shrink-0 text-white/70 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/30 ring-1 ring-black/20 z-50 overflow-hidden">
          <ul className="max-h-64 overflow-auto py-1">
            {options.map((option) => {
              const isSelected = value.includes(option);
              return (
                <li
                  key={option}
                  className={[
                    "cursor-pointer px-4 py-2 text-sm text-zinc-100 hover:bg-white/6 flex items-center justify-between",
                    isSelected ? "bg-white/6" : "",
                  ].join(" ")}
                  onClick={() => toggleOption(option)}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && (
                    <span className="text-xs text-violet-300" aria-hidden>
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
