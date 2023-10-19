"use client";

import { UserType } from "@/lib/db/schema";
import { DataTable } from "../[id]/clients/DataTable";
import { columns } from "../[id]/clients/columns";
import { User } from "../[id]/clients/schema";

export default async function ClientViewer({ data }: { data: UserType[] }) {
  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 py-8  pb-8 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
