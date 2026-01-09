type StarSize = "md" | "sm";

function Star({
  filled = false,
  size = "md",
  drinkStars = true,
  onClick,
  interactive = true,
}: {
  filled?: boolean;
  size?: "md" | "sm";
  drinkStars?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={interactive ? onClick : undefined}
      className={[
        size === "md" ? "w-6.5 h-6.5" : "w-5 h-5",
        drinkStars
          ? "cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-1 hover:scale-110"
          : "cursor-default",
        filled ? "text-[#f6c85f]" : "text-[#cfcfcf]",
      ].join(" ")}
      viewBox="0 0 24 24"
      aria-hidden
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1}
      role={interactive ? "button" : undefined}
    >
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847 1.417 8.268L12 19.771 4.583 23.863 6 15.595 0 9.748l8.332-1.73z" />
    </svg>
  );
}

export function RatingStars({
  rating,
  drinkStars = true,
  onClick,
}: {
  rating: number;
  drinkStars?: boolean;
  onClick?: (value: number) => void;
}) {
  const size: StarSize = drinkStars ? "sm" : "md";
  const interactive = drinkStars && Boolean(onClick);

  return (
    <div className="mt-2 flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          size={size}
          drinkStars={drinkStars}
          interactive={interactive}
          onClick={onClick ? () => onClick(star) : undefined}
        />
      ))}
    </div>
  );
}
