import { ColumnDef } from "@tanstack/react-table";
import { User } from "./schema";

import { DataTableRowActions } from "./data-table-row-action";
import { UserType } from "@/lib/db/schema";

// export const Tenant = typeof z.object({
//   id: z.serial(),
//   tenantName: z.string(),
//   tenantEmail: z.string(),
//   edit: z.string(),
// });
// const router = useRouter();
export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "firstName",
    header: "Firstname",
  },
  {
    accessorKey: "lastName",
    header: "Lastname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
