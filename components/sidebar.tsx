"use client";
import { cn } from "@/lib/utils";

// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  Calendar,
  Dog,
  DollarSign,
  Home,
  HomeIcon,
  Image,
  User,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
import { UserRole } from "@/lib/utils/UserRoleEnums";

import {
  LinkData,
  clientLinks,
  staffLinks,
  tenantLinks,
} from "./sidebar/linkData";
import SidebarLink from "./sidebar/SidebarLink";

let linksToRender: LinkData[] = [];
// Assuming you have a LinkData type and SidebarLink component as previously discussed
const linksConfig = {
  [UserRole.CLIENT]: [(linksToRender = clientLinks)],
  [UserRole.STAFF]: [(linksToRender = staffLinks)],
  [UserRole.TENANT]: [(linksToRender = tenantLinks)],
};

function getLinksForRole(role: UserRole) {
  return linksConfig[role] || [];
}

export function Sidebar({ className }: SidebarProps) {
  const { data: session, update } = useSession();

  const tenantId = session?.user?.tenantId;
  const userId = session?.user?.userId;
  const role = session?.user?.role as UserRole;

  // Polling the session every 1 hour
  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

  let linksToRender: LinkData[] = [];
  if (session?.user) {
    switch (session.user.role) {
      case UserRole.CLIENT:
        linksToRender = clientLinks;
        break;
      case UserRole.STAFF:
        linksToRender = staffLinks;
        break;
      case UserRole.TENANT:
        linksToRender = tenantLinks;
        break;
      // ... handle other roles as necessary
      default:
        // Handle default case, possibly an empty array or guest links
        linksToRender = [];
        break;
    }
  }

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

      <div className="flex flex-col gap-6 items-center">
        {linksToRender.map((link) => (
          <SidebarLink
            key={link.text}
            href={link.href}
            icon={link.icon}
            text={link.text}
          />
        ))}
      </div>
    </div>
  );
}
