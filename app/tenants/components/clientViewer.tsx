"use client";

import { DataTable } from "../[id]/clients/DataTable";
import { columns } from "../[id]/clients/columns";
import { User } from "../[id]/clients/schema";

type Props = {};

const ClientViewer = ({ data }: { data: User[] }) => {
  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 py-8  pb-8 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default ClientViewer;
