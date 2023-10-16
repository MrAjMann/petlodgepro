import { db } from "@/lib/db";
import { UserType, users } from "@/lib/db/schema";

import { eq, and } from "drizzle-orm";
import { DashboardOverviewPanel } from "../../components/dashboardOverviewPanel";
import Link from "next/link";

import StaffViewer from "../../components/staffViewer";
import { useParams } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export async function getUserData(): Promise<UserType[]> {
  return db.select().from(users);
}

const TenantStaffAdminPage = async ({ params }: Props) => {
  const res = await db
    .select()
    .from(users)
    .where(and(eq(users.tenantId, params.id), eq(users.role, "TENANT")));

  const allUsers = await getUserData().then((value) => {
    return value;
  });

  const StaffOnlyUsers = allUsers.filter(
    (users) => users.role === "STAFF" || users.role === "TENANT"
  );

  const user = res[0];

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
          <div className="relative my-14 flex  mx-48  justify-center items-center  border border-slate-400 rounded-lg px-12  font-semibold text-gray-200">
            <StaffViewer data={StaffOnlyUsers} />
          </div>
        </section>
      );
    }
  }
};
export default TenantStaffAdminPage;
