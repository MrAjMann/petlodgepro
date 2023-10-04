import { ColumnDef } from "@tanstack/react-table";
import { Tenant } from "./schema";

import { DataTableRowActions } from "./data-table-row-action";

// export const Tenant = typeof z.object({
//   id: z.serial(),
//   tenantName: z.string(),
//   tenantEmail: z.string(),
//   edit: z.string(),
// });
// const router = useRouter();
export const columns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "id",
    header: "Tenant Id",
  },
  {
    accessorKey: "tenantName",
    header: "Tenant Name",
  },
  {
    accessorKey: "tenantEmail",
    header: "Tenant Email",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
