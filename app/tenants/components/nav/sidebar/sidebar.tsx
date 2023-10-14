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

export function Sidebar({ className }: SidebarProps) {
  const { data: session, status, update } = useSession();

  // Polling the session every 1 hour
  useEffect(() => {
    // TIP: You can also use `navigator.onLine` and some extra event handlers
    // to check if the user is online and only update the session if they are.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

  // console.log("session", session, status);
  // console.log("session in sidebar", session);
  const tenantId = session?.user?.tenantId;
  return (
    <div className={cn("pb-12 min-h-screen ", className)}>
      <div className="space-y-4 py-4">
        <div className=" px-3 py-2">
          <div className="my-8 px-4 ">
            <h2 className="text-3xl font-bold tracking-tight text-gray-300">
              PetLodge Pro
            </h2>

            {session && (
              <p className="text-muted-foreground">
                Hello{" "}
                <span className="font-medium text-sm ">
                  {" "}
                  {session.user?.name}!{" "}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-4">
        {session?.user && session.user?.role === "CLIENT" && (
          <div className="space-y-8 flex flex-col">
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/profile`}
            >
              <User className="mr-4 w-6 h-6" />
              Profile
            </Link>

            <Link className="sidebar-link" href={`/tenants/${tenantId}/pets`}>
              <Dog className="mr-4 w-6 h-6" />
              Pets
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/bookings`}
            >
              <Calendar className="mr-4 w-6 h-6" />
              Bookings
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/payments`}
            >
              <DollarSign className="mr-4 w-6 h-6" />
              Payments
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/gallery`}
            >
              <Image className="mr-4 w-6 h-6" />
              Gallery
            </Link>
          </div>
        )}

        {session?.user && session?.user?.role === "STAFF" && (
          <div className="space-y-1">
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/dashboard`}
            >
              <Home className="mr-2 w-4 h-4" />
              Dashboard
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/bookings`}
            >
              <Home className="mr-2 w-4 h-4" />
              Bookings
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/pets`}
            >
              <Home className="mr-2 w-4 h-4" />
              Pets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
