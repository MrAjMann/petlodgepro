"use client";

import { DataTable } from "@/app/admin/dashboard/tenants/DataTable";
import { columns } from "@/app/admin/dashboard/tenants/columns";
import { Tenant } from "@/app/admin/dashboard/tenants/schema";

type Props = {};
const TenantViewer = ({ data }: { data: Tenant[] }) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 py-8  pb-8 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default TenantViewer;
