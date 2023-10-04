

import { columns } from "./columns";
import { db } from "@/lib/db";
import { $tenants, TenantType } from "@/lib/db/schema";

import Link from "next/link";
import { DataTable } from "./DataTable";
import TenantViewer from "../components/tenantViewer";

type Props = {};

export async function getTenantData(): Promise<TenantType[]> {
  return db.select().from($tenants);
}

const TenantDashboardPage = async () => {
  const tenants = await getTenantData();

  return (
    <section className="my-12">
      <div>
        <h1 className="text-primary-foreground text-2xl">Tenant Management</h1>
        <div className="seperator"></div>
      </div>

      {/* Tab Menu Bar */}
      <div>
        <h2>Add Tenant</h2>
        <Link href={"./tenants/create"}>Create Tenant</Link>
      </div>

      <TenantViewer data={tenants} />
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
