
import { cn } from "@/lib/utils";


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
import { UserRole } from "@/lib/utils/UserRoleEnums";
import SidebarLinks from "./sidebar/SidebarLinks";
import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { getTenantData } from "@/lib/utils/getTenantData";


export async function Sidebar({ className }: SidebarProps) {
  const session = await getServerSession(authOptions);
  const tenantId = session?.user?.tenantId;
  const userId = session?.user?.userId;
  const role = session?.user?.role as UserRole;
  const tenantData = await getTenantData();
  const tenantName = tenantData?.tenantBusinessName;

  return (
    <div className={cn(" ", className)}>
      <div className="space-y-4 py-4 ">
        <div className=" py-2">
          <div className="my-8  mx-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-300">
              PetLodge Pro
            </h2>
          </div>
          <div className=" flex flex-col mx-8">
          <span className="flex gap-4 text-red-400">

<p>{tenantName}</p>
  <p>{role}</p>
  </span>
            {session && (
              <p className="text-muted-foreground">
                Hello{" "}
                <span className="font-medium text-sm ">
                  {" "}
                  {session.user.firstName}!{" "}
             
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

              <SidebarLinks   />
    </div>
  );
}
