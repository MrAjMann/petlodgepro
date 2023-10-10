import { columns } from "./columns";
import { db } from "@/lib/db";
import { $tenants, TenantType } from "@/lib/db/schema";

import Link from "next/link";
import { DataTable } from "./DataTable";
import TenantViewer from "../components/tenantViewer";

import { checkUserRole } from "@/lib/utils/userUtils";

type Props = {};

export async function getTenantData(): Promise<TenantType[]> {
  return db.select().from($tenants);
}

const TenantDashboardPage = async () => {
  // const { organization } = auth();
  // const { session } = useSession();
  const orgRole = "admin";
  // console.log(organization);
  const tenants = await getTenantData();

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
      <div className="my-14 flex  mx-48 bg-white justify-between items-center  border border-slate-400 rounded-lg px-24 py-4 font-semibold text-gray-900">
        <div className="text-left space-y-1">
          <p className="text-2xl">
            {/* Active:Inactive */}
            <span>{15}</span> / <span className="text-red-300">{1}</span>
          </p>
          <h4 className="text-cyan-700">Tenants</h4>
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
      </div>

      <div className="flex justify-between ">
        {/* Tab Menu Bar */}
        <div>
          <Link
            className="rounded-lg flex flex-col justify-center items-center px-2 py-4 bg-white min-w-[300px] text-gray-700 font-semibold"
            href={"./tenants/create"}
          >
            Add Tenant
          </Link>
        </div>
      </div>
      <div className="relative my-14 flex  mx-48  justify-center items-center  border border-slate-400 rounded-lg px-12  font-semibold text-gray-200">
        <TenantViewer data={tenants} />
      </div>
    </section>
  );
};
export default TenantDashboardPage;

// export async function getTenants() {
//   const notes = await db
//     .select()
//     .from($tenants)

//   return notes;
// }
