"use client";

import { TenantType } from "@/lib/db/schema";
import { DataTable } from "../tenants/DataTable";
import { columns } from "../tenants/columns";
import { Tenant } from "../tenants/schema";

type Props = {};
const TenantViewer = ({ data }: { data: Tenant[] }) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 py-8  pb-8 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default TenantViewer;
