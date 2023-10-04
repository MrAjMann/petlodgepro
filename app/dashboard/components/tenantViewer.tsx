"use client";

import { TenantType } from "@/lib/db/schema";
import { DataTable } from "../tenants/DataTable";
import { columns } from "../tenants/columns";
import { Tenant } from "../tenants/schema";

type Props = {};
const TenantViewer = ({ data }: { data: Tenant[] }) => {
  return (
    <div className="flex max-w-[1200px] flex-col items-start gap-2 px-4 pt-8 md:pt-12 page-header pb-8 mx-auto">
      Current Tenants
      {/* Current Tenant List */}
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default TenantViewer;
