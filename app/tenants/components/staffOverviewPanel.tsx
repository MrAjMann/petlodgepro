import { db } from "@/lib/db";
import { UserType, users } from "@/lib/db/schema";
import axios from "axios";
import { and, eq } from "drizzle-orm";
import { useSession } from "next-auth/react";

export async function getUserData(): Promise<UserType[]> {
  return db.select().from(users);
}

type Props = {};
export const StaffOverviewPanel = async (props: Props) => {


  const allUsers = await getUserData().then((value) => {
    return value;
  });

  const StaffOnlyUsers = allUsers.filter(
    (users) => users.role === "STAFF" || users.role === "TENANT"
  );

  return (
    <div className="my-14  py-4 font-semibold text-gray-900  flex  items-center h-64 gap-16">
      <div className=" space-y-1 bg-white rounded-lg  border border-slate-400  w-64 h-full max-h-48  items-center flex flex-col justify-center">
        <p className="text-2xl ">
          {/* Active:Inactive */}
          <span className="text-8xl text-orange-300 font-medium">
            {StaffOnlyUsers.length}
          </span>
        </p>
        <h4 className="text-cyan-700 text-xl">Staff</h4>
      </div>
      <div className=" space-y-1 bg-white rounded-lg  border border-slate-400  w-64 h-full max-h-48  items-center flex flex-col justify-center">
        <p className="text-2xl ">
          {/* Active:Inactive */}
          <span className="text-8xl text-orange-300 font-medium">
            {StaffOnlyUsers.length}
          </span>
        </p>
        <h4 className="text-cyan-700 text-xl">Staff</h4>
      </div>{" "}
      <div className=" space-y-1 bg-white rounded-lg  border border-slate-400  w-64 h-full max-h-48  items-center flex flex-col justify-center">
        <p className="text-2xl ">
          {/* Active:Inactive */}
          <span className="text-8xl text-orange-300 font-medium">
            {StaffOnlyUsers.length}
          </span>
        </p>
        <h4 className="text-cyan-700 text-xl">Staff</h4>
      </div>
    </div>
  );
};
