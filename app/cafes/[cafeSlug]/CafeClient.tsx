"use client";

import Image from "next/image";
import { RatingStars } from "@/components/Stars";
import { useState } from "react";
import type { Cafe } from "@/lib/types";
import { formatAddress } from "@/lib/helpers";
import CafeComments from "@/components/CafeComments";
import { HomeIcon } from "@/components/HomeIcon";
import { useRouter } from "next/navigation";

function DrinkIcon({ d }: { d: string }) {
  return (
    <svg
      className="w-7 h-7 fill-amber-900/40 dark:fill-white/60"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

function BackArrow() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="inline-flex items-center gap-2 text-sm text-amber-900/70 hover:text-amber-900 dark:text-white/60 hover:dark:text-white hover:cursor-pointer"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

export default function CafeClient({ cafe }: { cafe: Cafe }) {
  const [drinkRating, setDrinkRating] = useState({
    flatWhite: cafe.ratings.flatWhite,
    cappuccino: cafe.ratings.cappuccino,
    americano: cafe.ratings.americano,
    doubleEspresso: cafe.ratings.doubleEspresso,
    icedLatte: cafe.ratings.icedLatte,
  });

  const formattedAddresses = formatAddress(cafe.address);

  function handleStarClick(drink: keyof typeof drinkRating, value: number) {
    setDrinkRating((prevRatings) => ({
      ...prevRatings,
      [drink]: value,
    }));
  }

  const drinkValues = Object.values(drinkRating);
  const averageRating = Math.round(
    drinkValues.reduce((a, b) => a + b, 0) / drinkValues.length,
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-rose-50 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-amber-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/3 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <BackArrow />
          {/* Header */}
          <header className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {cafe.name}
              </h1>
              <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
                {cafe.location}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-zinc-700 dark:text-zinc-400">
                Total Avg Rating
              </div>
              <div className="mt-1">
                <RatingStars rating={averageRating} drinkStars={false} />
              </div>
            </div>
          </header>

          {/* Hero */}
          <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1 rounded-2xl border border-amber-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/3">
              <div className="text-xs uppercase tracking-wide text-amber-900/60 dark:text-zinc-400">
                Address
              </div>
              <div className="mt-2 text-sm text-zinc-900 dark:text-zinc-200">
                {formattedAddresses.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 dark:bg-violet-400" />
                <span className="text-xs text-zinc-700 dark:text-zinc-400">
                  Open to edit later
                </span>
              </div>
            </div>

            <div className="sm:col-span-2 relative w-full overflow-hidden rounded-2xl border border-amber-200/70 aspect-video dark:border-white/10">
              <Image
                src="/img/cafe-img-1.jpg"
                alt="Cafe"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/0 to-black/0 dark:from-black/40" />
            </div>
          </section>

          {/* Drinks */}
          <section className="mt-10">
            <div className="flex items-end justify-between">
              <h3 className="text-lg font-semibold">Drinks</h3>
              <div className="text-xs text-zinc-700 dark:text-zinc-400">
                Tap stars to rate each drink
              </div>
            </div>

            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center justify-between rounded-2xl border border-amber-200/70 bg-white/70 p-3 sm:p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center rounded-xl border border-amber-200/70 bg-amber-50/60 p-2 dark:border-white/10 dark:bg-white/4">
                    <DrinkIcon d="M3 3h12v6a6 6 0 01-6 6H6a6 6 0 01-6-6V3z" />
                  </div>
                  <span className="text-sm sm:text-base">Flat White</span>
                </div>
                <RatingStars
                  rating={drinkRating.flatWhite}
                  onClick={(value) => handleStarClick("flatWhite", value)}
                />
              </li>

              <li className="flex items-center justify-between rounded-2xl border border-amber-200/70 bg-white/70 p-3 sm:p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center rounded-xl border border-amber-200/70 bg-amber-50/60 p-2 dark:border-white/10 dark:bg-white/4">
                    <DrinkIcon d="M4 3h14v10a4 4 0 01-4 4H8a4 4 0 01-4-4V3z" />
                  </div>
                  <span className="text-sm sm:text-base">Cappuccino</span>
                </div>
                <RatingStars
                  rating={drinkRating.cappuccino}
                  onClick={(value) => handleStarClick("cappuccino", value)}
                />
              </li>

              <li className="flex items-center justify-between rounded-2xl border border-amber-200/70 bg-white/70 p-3 sm:p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center rounded-xl border border-amber-200/70 bg-amber-50/60 p-2 dark:border-white/10 dark:bg-white/4">
                    <DrinkIcon d="M2 5h18v12H2z" />
                  </div>
                  <span className="text-sm sm:text-base">Americano</span>
                </div>
                <RatingStars
                  rating={drinkRating.americano}
                  onClick={(value) => handleStarClick("americano", value)}
                />
              </li>

              <li className="flex items-center justify-between rounded-2xl border border-amber-200/70 bg-white/70 p-3 sm:p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center rounded-xl border border-amber-200/70 bg-amber-50/60 p-2 dark:border-white/10 dark:bg-white/4">
                    <DrinkIcon d="M6 2h8v6H6zM4 10h12v8H4z" />
                  </div>
                  <span className="text-sm sm:text-base">Double Espresso</span>
                </div>
                <RatingStars
                  rating={drinkRating.doubleEspresso}
                  onClick={(value) => handleStarClick("doubleEspresso", value)}
                />
              </li>

              <li className="flex items-center justify-between rounded-2xl border border-amber-200/70 bg-white/70 p-3 sm:p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center rounded-xl border border-amber-200/70 bg-amber-50/60 p-2 dark:border-white/10 dark:bg-white/4">
                    <DrinkIcon d="M2 4h16v14H2z" />
                  </div>
                  <span className="text-sm sm:text-base">Iced Latte</span>
                </div>
                <RatingStars
                  rating={drinkRating.icedLatte}
                  onClick={(value) => handleStarClick("icedLatte", value)}
                />
              </li>
            </ul>
          </section>

          {/* Comments */}
          <CafeComments initialComments={cafe.comments} />
        </div>
      </div>
    </main>
  );
}
