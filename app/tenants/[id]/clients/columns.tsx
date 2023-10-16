import { ColumnDef } from "@tanstack/react-table";
import { User } from "./schema";

import { DataTableRowActions } from "./data-table-row-action";

// export const Tenant = typeof z.object({
//   id: z.serial(),
//   tenantName: z.string(),
//   tenantEmail: z.string(),
//   edit: z.string(),
// });
// const router = useRouter();
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "User Id",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "User Email",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
