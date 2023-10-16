"use client";

import { UserType } from "@/lib/db/schema";
import { DataTable } from "../[id]/staff/DataTable";
import { columns } from "../[id]/staff/columns";
import { User } from "../[id]/staff/schema";

type Props = {};
const StaffViewer = ({ data }: { data: User[] }) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 py-8  pb-8 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default StaffViewer;
