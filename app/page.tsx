"use client";

import Link from "next/link";
import { cafes } from "@/lib/data/cafes";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";
import type { Cafe } from "@/lib/types";

// type Star = 1 | 2 | 3 | 4 | 5;
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
    // const matchesRating =
    //   ratingFilter.length === 0 ||
    //   ratingFilter.includes(
    //     cafe.rating === 1 ? "1 Star" : `${cafe.rating} Stars`
    //   );

    return matchesLocation && matchesCafe;
    // && matchesRating;
  });

  return (
    <>
      <h1>Hello</h1>

      <ul>
        {cafes.map((cafe) => (
          <li key={cafe.id}>
            <Link href={`/cafes/${cafe.slug}`}>{cafe.name}</Link>
          </li>
        ))}
      </ul>

      <section className="relative w-full overflow-visible rounded-lg h-100 bg-[#fafafa]">
        <div className="dark:bg-transparent">
          <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-gray-800 dark:text-white font-black leading-10">
                Heading
                <span className="text-violet-800 dark:text-violet-500">
                  heading
                </span>
                Heading
              </h1>
              <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-600 dark:text-gray-300 font-normal text-center text-xl">
                Filter cafes by location, name, and rating to find your perfect
                spot.
              </p>
            </div>

            <div className="mx-auto flex flex-col items-center w-11/12 sm:w-2/3 lg:w-2/4">
              <div className="flex rounded-md w-full gap-2 items-center justify-center">
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
                {/* <button className="rounded-md bg-[#111] px-3.5 py-2.5 text-white h-10">
                  Find
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full overflow-visible rounded-lg h-100 mt-5 bg-[#fafafa]">
        <CafeGrid cafes={filteredCafes} />
      </section>
    </>
  );
}

type CafeGridProps = { cafes: Cafe[] };

function CafeGrid({ cafes }: CafeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cafes.map((cafe) => (
        <Link
          href={`/cafes/${cafe.slug}`}
          key={cafe.id}
          className="border border-gray-300 rounded-lg p-4 bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{cafe.name}</h2>
          <p className="text-gray-600 mb-1">Location: {cafe.location}</p>
          <p className="text-gray-600">Rating: {cafe.ratings.overall} Stars</p>
        </Link>
      ))}
    </div>
  );
}
