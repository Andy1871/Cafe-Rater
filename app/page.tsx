"use client";

import Link from "next/link";
import { cafes } from "@/lib/data/cafes";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";
import type { Cafe } from "@/lib/types";
import { CafeModal } from "@/components/CafeModal";

const STAR_OPTIONS = [1, 2, 3, 4, 5] as const;
const RATINGS = [
  "All Ratings",
  ...STAR_OPTIONS.map((r) => `${r === 1 ? "1 Star" : `${r} Stars`}`),
] as const;
type RatingOption = (typeof RATINGS)[number];

const locationOptions = Array.from(new Set(cafes.map((cafe) => cafe.location)));
const cafeNameOptions = Array.from(new Set(cafes.map((cafe) => cafe.name)));

const LOCATIONS = ["All Locations", ...locationOptions] as const;
const CAFENAMES = ["All Cafes", ...cafeNameOptions] as const;

export default function Home() {
  const [locationFilter, setLocationFilter] =
    useState<string[]>(locationOptions);
  const [cafeFilter, setCafeFilter] = useState<string[]>(cafeNameOptions);
  const [ratingFilter, setRatingFilter] = useState<RatingOption[]>(
    RATINGS.slice(1) as RatingOption[]
  );

  const filteredCafes = cafes.filter((cafe) => {
    const matchesLocation =
      locationFilter.length === 0 || locationFilter.includes(cafe.location);
    const matchesCafe =
      cafeFilter.length === 0 || cafeFilter.includes(cafe.name);

    return matchesLocation && matchesCafe;
  });

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-100">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:pt-14">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Cafe Rater
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Find your next{" "}
                <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                  favourite cafe
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-zinc-300">
                Filter by location, cafe name, and rating to quickly find places
                worth visiting.
              </p>

              {/* Filters */}
              <div className="mt-2 w-full">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Dropdown
                    options={LOCATIONS}
                    label="Location"
                    value={locationFilter}
                    onChange={setLocationFilter}
                    placeholder="Select Locations"
                  />
                  <Dropdown
                    options={CAFENAMES}
                    label="Cafe"
                    value={cafeFilter}
                    onChange={setCafeFilter}
                    placeholder="Select Cafes"
                  />
                  <Dropdown
                    options={RATINGS}
                    label="Rating"
                    value={ratingFilter}
                    onChange={setRatingFilter}
                    placeholder="Select Ratings"
                  />
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <div className="text-sm text-zinc-400">
                    Showing{" "}
                    <span className="text-zinc-200 font-semibold">
                      {filteredCafes.length}
                    </span>{" "}
                    cafes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="rounded-2xl border border-white/10 bg-white/3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <CafeGrid cafes={filteredCafes} />
          </div>
        </section>
      </main>

      
    </>
  );
}

type CafeGridProps = { cafes: Cafe[] };

function CafeGrid({ cafes }: CafeGridProps) {
  const [isCafeModalOpen, setIsCafeModalOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);

  function openCafeModal(cafe: Cafe) {
    setSelectedCafe(cafe);
    setIsCafeModalOpen(true);
  }

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cafes.map((cafe) => (
            <div
              key={cafe.id}
              className="group rounded-2xl border border-white/10 bg-white/4 p-4 shadow-sm transition hover:bg-white/6 hover:border-white/15"
            >
              <button
                type="button"
                onClick={() => openCafeModal(cafe)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
                    {cafe.name}
                  </h2>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-200">
                    {cafe.ratings.overall}★
                  </span>
                </div>

                <p className="mt-1 text-sm text-zinc-400">{cafe.location}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400/80" />
                  Tap card for quick view
                </div>
              </button>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/cafes/${cafe.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-violet-300 hover:text-violet-200 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  View full page
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => openCafeModal(cafe)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/8 transition"
                >
                  Quick view
                </button>
              </div>
            </div>
          ))}
        </div>

        {cafes.length === 0 && (
          <div className="py-16 text-center text-zinc-400">
            No cafes match those filters.
          </div>
        )}
      </div>

      <CafeModal
        isOpen={isCafeModalOpen}
        onClose={() => setIsCafeModalOpen(false)}
        cafe={selectedCafe}
      />
    </>
  );
}
