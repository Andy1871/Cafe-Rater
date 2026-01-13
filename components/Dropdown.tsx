"use client";
import { useState } from "react";
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
      next = isSelected
        ? value.filter((v) => v !== option)
        : [...value, option];
    }

    onChange(next);
  }

  let buttonText;
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

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-between w-56 rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-black hover:bg-gray-50 h-10"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="truncate">{buttonText}</span>
        <FaCaretDown className="ml-2 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none z-50">
          <ul className="py-1">
            {options.map((option) => {
              const isSelected = value.includes(option);
              return (
                <li
                  key={option}
                  className={[
                    "cursor-pointer px-4 py-2 text-sm text-black hover:bg-gray-100 flex justify-between",
                    isSelected && "bg-gray-100",
                  ].join(" ")}
                  onClick={() => {
                    toggleOption(option);
                  }}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && <span aria-hidden>✓</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
