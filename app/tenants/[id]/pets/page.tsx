type User = typeof users.$inferSelect;
type Pet = typeof users.$inferSelect;

import { db } from "@/lib/db";
import { pets, users } from "@/lib/db/schema";
import { authOptions } from "@/lib/utils/authOptions";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const UserPetsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  const selectedUserPets = await db
    .select()
    .from(users)
    .where(eq(pets.ownerId, currentUser.id))
    .leftJoin(pets, eq(users.id, pets.ownerId));

  const allPets = await db.select().from(pets);

  const userPets = selectedUserPets.map((pet) => pet.pets);
  if (userPets.length < 1) {
    return (
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
    );
  }

  return (
    <section className="min-h-screen">
      <div>
        {currentUser.role === "CLIENT" && (
          <div>
            <div>
              <h1>Your Pets</h1>
              <div>
                {userPets.map((pets) => (
                  <div key={pets?.id}>
                    <p className="text-white text-2xl">{pets?.petName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {currentUser.role === "STAFF" && (
          <div>
            <div>
              <h1>View all pets</h1>
              <div>
                {allPets.map((pets) => (
                  <div key={pets?.id}>
                    <p className="text-white text-2xl">{pets?.petName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPetsPage;
