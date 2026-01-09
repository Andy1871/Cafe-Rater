"use client";

import Image from "next/image";
import { RatingStars } from "@/components/Stars";
import { useState } from "react";
import type { Cafe, CafeComment } from "@/lib/types";

function DrinkIcon({ d }: { d: string }) {
  return (
    <svg className="w-7 h-7 fill-[#8b8b8b]" viewBox="0 0 24 24" aria-hidden>
      <path d={d} />
    </svg>
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

  const [comments, setComments] = useState<CafeComment[]>(cafe.comments);
  const [newComment, setNewComment] = useState<string>("");

  function handleStarClick(drink: keyof typeof drinkRating, value: number) {
    setDrinkRating((prevRatings) => ({
      ...prevRatings,
      [drink]: value,
    }));
  }

  const drinkValues = Object.values(drinkRating);
  const averageRating = Math.round(
    drinkValues.reduce((a, b) => a + b, 0) / drinkValues.length
  );

  function handleSubmitComment() {
    if (newComment.trim() === "") return;

    const comment: CafeComment = {
      id: Date.now(),
      author: "Anonymous",
      title: "No Title",
      content: newComment,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComments((prevComments) => [comment, ...prevComments]);
    setNewComment("");
  }

  return (
    <main>
      <div className="font-sans text-[#111]">
        {/* Header */}
        <header className="flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="m-0 text-[28px] font-bold leading-tight">
              {cafe.name}
            </h1>
            <div className="mt-1.5 text-[#666]">{cafe.location}</div>
          </div>

          <div className="text-left md:text-right">
            <div className="text-[12px] text-[#666]">Total Avg Rating</div>
            <RatingStars rating={averageRating} drinkStars={false} />
          </div>
        </header>

        {/* Hero */}
        <section className="mt-5 flex flex-col gap-4">
          <div>
            <div className="mb-1 font-bold">Address</div>
            <div className="text-[#333]">{cafe.address}</div>
          </div>
          <div className="relative w-full overflow-hidden rounded-lg aspect-video">
            <Image
              src="/img/cafe-img-1.jpg"
              alt="Cafe"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Drinks */}
        <section className="mt-7">
          <h3 className="mb-3 font-bold">Drinks</h3>

          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M3 3h12v6a6 6 0 01-6 6H6a6 6 0 01-6-6V3z" />
                <span>Flat White</span>
              </div>
              <RatingStars
                rating={drinkRating.flatWhite}
                onClick={(value) => handleStarClick("flatWhite", value)}
              />
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M4 3h14v10a4 4 0 01-4 4H8a4 4 0 01-4-4V3z" />
                <span>Cappuccino</span>
              </div>
              <RatingStars
                rating={drinkRating.cappuccino}
                onClick={(value) => handleStarClick("cappuccino", value)}
              />
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M2 5h18v12H2z" />
                <span>Americano</span>
              </div>
              <RatingStars
                rating={drinkRating.americano}
                onClick={(value) => handleStarClick("americano", value)}
              />
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M6 2h8v6H6zM4 10h12v8H4z" />
                <span>Double Espresso</span>
              </div>
              <RatingStars
                rating={drinkRating.doubleEspresso}
                onClick={(value) => handleStarClick("doubleEspresso", value)}
              />
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M2 4h16v14H2z" />
                <span>Iced Latte</span>
              </div>
              <RatingStars
                rating={drinkRating.icedLatte}
                onClick={(value) => handleStarClick("icedLatte", value)}
              />
            </li>
          </ul>
        </section>

        {/* Comments */}
        <section className="mt-7">
          <h3 className="mb-3 font-bold">Comments</h3>

          <div className="flex flex-col gap-2">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-[#eee] bg-white p-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <strong>{comment.author}</strong>
                    <div className="text-sm text-[#666]">{comment.title}</div>
                  </div>
                  <div className="mt-2 text-[#333]">{comment.content}</div>
                  <div className="mt-2 text-right text-[12px] text-[#888]">
                    [{comment.date}]
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment..."
              aria-label="Leave a comment"
              className="min-h-20 flex-1 resize-y rounded-md border border-[#ddd] p-2"
            />
            <button
              onClick={handleSubmitComment}
              className="rounded-md bg-[#111] px-3.5 py-2.5 text-white"
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
