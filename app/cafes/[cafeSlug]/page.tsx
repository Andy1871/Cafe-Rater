// server page so that we can await the params - client component cannot be async

import { cafes } from "@/lib/data/cafes";
import CafeClient from "./CafeClient";

export default async function CafePage({
  params,
}: {
  params: Promise<{ cafeSlug: string }>;
}) {
  const { cafeSlug } = await params;
  const cafe = cafes.find((cafe) => cafe.slug === cafeSlug);

  if (!cafe) {
    return <div>Cafe not found</div>;
  }

  return <CafeClient cafe={cafe} />;
}
