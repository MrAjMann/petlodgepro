import QuickViewModule from "@/components/quickview-module";
import { Heading } from "@/components/ui/heading";
import { db } from "@/lib/db";
import { Pet, User, pets, users } from "@/lib/db/schema";
import { authOptions } from "@/lib/utils/authOptions";
import { getTodaysDate } from "@/lib/utils/getTodaysDate";
import axios from "axios";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

interface DashboardPageProps {
  pets: Pet[];
  users: User[];
}

const DashboardPage: React.FC<DashboardPageProps> = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const selectedUserPets = await db.select().from(pets);

  const todaysDate = getTodaysDate();
  if (selectedUserPets.length === 0) {
    return (
      <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Heading title="Dashboard" description={`${todaysDate}`} />
            </div>

            {/* Pets Quick View - Provide a quick view of pets, possibly in a carousel for ease of navigation */}
            <div className="flex items-center justify-center w-full gap-4">
              <p>No pets found...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <Heading title="Dashboard" description={`${todaysDate}`} />
          </div>

          {/* Pets Quick View - Provide a quick view of pets, possibly in a carousel for ease of navigation */}
          <div className="flex items-center justify-center w-full gap-4">
            {selectedUserPets.map((pet) => (
              <QuickViewModule key={pet.id} data={pet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
