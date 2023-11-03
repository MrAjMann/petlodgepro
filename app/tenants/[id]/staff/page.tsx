import { db } from "@/lib/db";
import { User, users } from "@/lib/db/schema";

import Link from "next/link";

import StaffViewer from "../../components/staffViewer";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";

type Props = {
  params: {
    id: string;
  };
};

export async function getUserData(): Promise<User[]> {
  return db.select().from(users);
}

const TenantStaffAdminPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const allUsers = await getUserData().then((value) => {
    return value;
  });

  const StaffOnlyUsers = allUsers.filter(
    (users) => users.role === "STAFF" || users.role === "TENANT"
  );

  if (params.id === user?.tenantId) {
    if (user.role === "TENANT") {
      return (
        <section className="my-12">
          <div className="flex justify-between ">
            {/* Tab Menu Bar */}
            <div>
              <Link
                className="rounded-lg flex flex-col justify-center items-center px-2 py-4 bg-white min-w-[300px] text-gray-700 font-semibold"
                href={"./staff/create"}
              >
                Add Staff
              </Link>
            </div>
          </div>
          <div className="relative my-14 flex mx-auto   justify-center items-center  border border-slate-400 rounded-lg px-12  font-semibold text-gray-200 max-w-[1600px]">
            <StaffViewer data={StaffOnlyUsers} />
          </div>
        </section>
      );
    }
  }
};
export default TenantStaffAdminPage;
