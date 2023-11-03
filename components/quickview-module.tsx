import { Pet } from "@/lib/db/schema";
import Image from "next/image";
import Link from "next/link";

export default function QuickViewModule({ data }: { data: Pet }) {
  // const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const url = `/`;
  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <Image
          alt={data.petName ?? "Card thumbnail"}
          width={400}
          height={300}
          className="h-44 object-cover"
          src={
            "https://fakeimg.pl/600x400/cccccc/969696?text=Pretty+Dogo&font=lobster"
          }
        />
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide  dark:text-white">
            {data.petName}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.petBreed}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {url} ↗
        </a>
      </div>
    </div>
  );
}
