import { db } from "@/lib/db";
import { PetType, pets } from "@/lib/db/schema";
import { authOptions } from "@/lib/utils/authOptions";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Link from "next/link";
import PetCard from "./components/petCard";
import { User } from "../clients/schema";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function UserPetsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const selectedUserPets = await db
    .select()
    .from(pets)
    .where(eq(pets.ownerId, user.id));

  if (!selectedUserPets) {
    return (
      <section className="my-14">
        <div>
          <h1 className="text-4xl text-primary-foreground ">Your Pets</h1>
        </div>
        <div className="seperator"></div>
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-slate-500 flex flex-col justify-center gap-4">
          <p className="text-2xl">No pets have been added</p>
          <div>
            <Link
              className="rounded-lg flex flex-col justify-center items-center px-2 py-4 bg-white min-w-[300px] text-gray-700 font-semibold"
              href={"./pets/create"}
            >
              Add Pet
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const userPets = selectedUserPets;

  if (!user) {
    return {
      props: {
        user: null,
        userPets: undefined,
      },
    };
  }

  if (!user) {
    return <section className="my-14">{/* ... */}</section>;
  }
  if (!userPets || userPets.length === 0) {
    return (
      <section className="my-14">
        <div>
          <h1 className="text-4xl text-primary-foreground ">Your Pets</h1>
        </div>
        <div className="seperator"></div>
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-slate-500 flex flex-col justify-center gap-4">
          <p className="text-2xl">No pets have been added</p>
          <div>
            <Link
              className="rounded-lg flex flex-col justify-center items-center px-2 py-4 bg-white min-w-[300px] text-gray-700 font-semibold"
              href={"./pets/create"}
            >
              Add Pet
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" overflow-hidden">
      {user.role === "CLIENT" && (
        <div>
          <div>
            <h1 className="text-4xl text-primary-foreground ">Your Pets</h1>
          </div>
          <div className="seperator "></div>
          <div className="h-24"></div>
          <div className="flex flex-col items-center h-full my-1 justify-center">
            <PetCard data={userPets} />
          </div>
        </div>
      )}
    </section>
  );
}
