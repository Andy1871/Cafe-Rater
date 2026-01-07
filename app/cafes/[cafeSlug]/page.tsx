import Image from "next/image";
import { cafes } from "@/lib/data/cafes";

function Star({
  filled = false,
  size = "md",
  drinkRatings = true,
}: {
  filled?: boolean;
  size?: "md" | "sm";
  drinkRatings?: boolean;
}) {
  return (
    <svg
      className={[
        size === "md" ? "w-6.5 h-6.5" : "w-5 h-5",
        drinkRatings
          ? "cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-1 hover:scale-110"
          : "cursor-default",
        filled ? "text-[#f6c85f]" : "text-[#cfcfcf]",
      ].join(" ")}
      viewBox="0 0 24 24"
      aria-hidden
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1}
    >
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847 1.417 8.268L12 19.771 4.583 23.863 6 15.595 0 9.748l8.332-1.73z" />
    </svg>
  );
}

function DrinkIcon({ d }: { d: string }) {
  return (
    <svg className="w-7 h-7 fill-[#8b8b8b]" viewBox="0 0 24 24" aria-hidden>
      <path d={d} />
    </svg>
  );
}

// NEXT ADD PARAMS SO WE CAN SEE ALL CAFE PAGES

export default function CafePage({
  params,
}: {
  params?: { cafeSlug?: string };
}) {
  const cafe = cafes[0];

  return (
    <main>
      <div className="mx-auto max-w-200 px-6 py-10 font-sans text-[#111]">
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
            <div className="mt-2 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= cafe.ratings.overall}
                    drinkRatings={false}
                  />
                ))}
            </div>
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
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= cafe.ratings.flatWhite}
                    size="sm"
                  />
                ))}

              </div>
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M4 3h14v10a4 4 0 01-4 4H8a4 4 0 01-4-4V3z" />
                <span>Cappuccino</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= cafe.ratings.cappuccino}
                    size="sm"
                  />
                ))}
              </div>
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M2 5h18v12H2z" />
                <span>Americano</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= cafe.ratings.americano}
                    size="sm"
                  />
                ))}
              </div>
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M6 2h8v6H6zM4 10h12v8H4z" />
                <span>Double Espresso</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= cafe.ratings.doubleEspresso}
                    size="sm"
                  />
                ))}
              </div>
            </li>

            <li className="flex items-center justify-between rounded-lg bg-[#fafafa] p-2.5">
              <div className="flex items-center gap-2.5">
                <DrinkIcon d="M2 4h16v14H2z" />
                <span>Iced Latte</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= cafe.ratings.icedLatte}
                    size="sm"
                  />
                ))}
              </div>
            </li>
          </ul>
        </section>

        {/* Comments */}
        <section className="mt-7">
          <h3 className="mb-3 font-bold">Comments</h3>

          <div className="flex flex-col gap-2">
            {cafe.comments.map((comment) => (
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
              placeholder="Leave a comment..."
              aria-label="Leave a comment"
              className="min-h-20 flex-1 resize-y rounded-md border border-[#ddd] p-2"
            />
            <button className="rounded-md bg-[#111] px-3.5 py-2.5 text-white">
              Submit
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
