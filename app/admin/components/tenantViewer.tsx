"use client";

import { TenantType } from "@/lib/db/schema";

import { columns } from "../dashboard/tenants/columns";
import { Tenant } from "../dashboard/tenants/schema";
import { DataTable } from "../dashboard/tenants/DataTable";

type Props = {};
const TenantViewer = ({ data }: { data: Tenant[] }) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 py-8  pb-8 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default TenantViewer;
