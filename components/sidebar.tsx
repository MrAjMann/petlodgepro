
import { cn } from "@/lib/utils";


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
import { UserRole } from "@/lib/utils/UserRoleEnums";
import SidebarLinks from "./sidebar/SidebarLinks";
import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import axios from "axios";
import { SettingLinks } from "./sidebar/SidebarLinkBuilder";

import * as icon from 'lucide-react';

export async function Sidebar({ className }: SidebarProps) {
  const session = await getServerSession(authOptions);
  const tenantId = session?.user?.tenantId;
  const userId = session?.user?.userId;
  const role = session?.user?.role as UserRole;
  TODO: "create func to check if baseurl is localhost or prod"
  TODO: "Remove tenant business name and user role from sidebar"
  const tenantData =  await axios.get(`http://localhost:3001/api/tenants/${tenantId}`).then(res => {
    return res.data
  }, error => {
    console.log(error)
    if (error.response.status === 401) {
      console.log("error", error.response.data)
      return null
    }
  });
  console.log(tenantData)
  const nonAuthenticatedLinks = [
    {
      href: "/profile",
      icon: <icon.PersonStandingIcon className="mr-4 w-6 h-6" />,
      text: "Profile",
    },
    {
      href: "/help",
      icon: <icon.HelpingHand className="mr-4 w-6 h-6" />,
      text: "Help",
    },
    {
      href: "/settings",
      icon: <icon.CogIcon className="mr-4 w-6 h-6" />,
      text: "Settings",
    },
    {
      href: "/signout",
      icon: <icon.LogOut className="mr-4 w-6 h-6" />,
      text: "Logout",
    },
  ];



  return (
    <div className={cn("relative  h-full max-h-fit overflow-hidden", className)}>
      
      <div className="space-y-4 py-4 ">
        <div className=" py-2">
          <div className="my-8  mx-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-300">
              PetLodge Pro
            </h2>
          </div>
          <div className=" flex flex-col mx-8">
          <span className="flex gap-4 text-red-400">
 
<p>{tenantData?.tenantBusinessName}</p>
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
<div className="flex flex-col justify-between h-full">

  <SidebarLinks   />
  <div className='w-full absolute bottom-5 left-5 flex flex-col gap-2'>

    { nonAuthenticatedLinks.map((link) => (
        <SettingLinks
        key={link.text}
        href={link.href}
        icon={link.icon}
        text={link.text}
        />
      ))}
  </div>
</div>
    </div>
  );
}
