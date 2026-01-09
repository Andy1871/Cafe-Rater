import Link from "next/link";
import { cafes } from "@/lib/data/cafes";

export default function Home() {
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
    </>
  );
}
