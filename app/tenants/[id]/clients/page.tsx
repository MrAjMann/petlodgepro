import { db } from "@/lib/db";

import { eq, and } from "drizzle-orm";
import { DashboardOverviewPanel } from "../../components/dashboardOverviewPanel";
import Link from "next/link";

import ClientViewer from "../../components/clientViewer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { User } from "./schema";
import { UserType, users } from '@/lib/db/schema';

type Props = {
  params: {
    id: string;
  };
};

export async function getUserData(): Promise<UserType[]> {
 return db.select().from(users);
  
}

export default async function TenantClientAdminPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const allUsers = await getUserData().then((value) => {
    return value;
  });

  const ClientOnlyUsers = allUsers.filter((users) => users.role === "CLIENT");

  if (id === user?.tenantId) {
    if (user.role === "TENANT" || user.role === "STAFF") {
      return (
        <section className="my-12">
          {/* {orgRole === "admin" ? (
          <div>
            <h1 className="text-primary-foreground text-2xl">
              Tenant Management
            </h1>
            <div className="seperator"></div>
          </div>
        ) : (
          <div>
            <h1 className="text-primary-foreground text-2xl">Staff Management</h1>
            <div className="seperator"></div>
          </div>
        )} */}
          {/* <div className="my-14 flex  mx-48 bg-white justify-between items-center  border border-slate-400 rounded-lg px-24 py-4 font-semibold text-gray-900">
            <div className="text-left space-y-1">
              <p className="text-2xl">
                <span>{15}</span> / <span className="text-red-300">{1}</span>
              </p>
              <h4 className="text-cyan-700">Staff Members</h4>
            </div>
            <div className="text-left space-y-1">
              <p className="text-2xl">
                <span>{7}</span> / <span className="text-red-300">{0}</span>
              </p>
              <h4 className="text-cyan-700">Users</h4>
            </div>
            <div className="text-left space-y-1">
              <p className="text-2xl">
                <span>{17}</span>
              </p>
              <h4 className="text-cyan-700">Active Connections</h4>
            </div>
            <div className="text-left space-y-1">
              <p className="text-2xl">
                <span>{1}</span>
              </p>
              <h4 className="text-cyan-700">Support Tickets</h4>
            </div>
          </div> */}

          <div className="flex justify-between ">
            {/* Tab Menu Bar */}
            <div>
              <Link
                className="rounded-lg flex flex-col justify-center items-center px-2 py-4 bg-white min-w-[300px] text-gray-700 font-semibold"
                href={"./clients/create"}
              >
                Add Client
              </Link>
            </div>
          </div>

          <div className="relative my-14 flex  mx-48  justify-center items-center  border border-slate-400 rounded-lg px-12  font-semibold text-gray-200">
            <ClientViewer data={ClientOnlyUsers} />
          </div>
        </section>
      );
    }
  }
}
