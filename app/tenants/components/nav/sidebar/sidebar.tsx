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
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

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
                  {session.user.firstName}!{" "}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-4">
        {session?.user && session.user?.role === "CLIENT" && (
          <div className="space-y-4 flex flex-col">
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
          <div className="space-y-4 flex flex-col">
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/dashboard`}
            >
              <Home className="mr-4 w-6 h-6" />
              Dashboard
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/bookings`}
            >
              <Home className="mr-4 w-6 h-6" />
              Bookings
            </Link>
            <Link className="sidebar-link" href={`/tenants/${tenantId}/pets`}>
              <Home className="mr-4 w-6 h-6" />
              Pets
            </Link>
          </div>
        )}
        {session?.user && session?.user?.role === "TENANT" && (
          <div className="space-y-4 flex flex-col">
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/dashboard`}
            >
              <Home className="mr-4 w-6 h-6" />
              Dashboard
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/bookings`}
            >
              <Home className="mr-4 w-6 h-6" />
              Bookings
            </Link>
            <Link className="sidebar-link" href={`/tenants/${tenantId}/staff`}>
              <Home className="mr-4 w-6 h-6" />
              Staff
            </Link>
            <Link
              className="sidebar-link"
              href={`/tenants/${tenantId}/clients`}
            >
              <Home className="mr-4 w-6 h-6" />
              Clients
            </Link>
            <Link className="sidebar-link" href={`/tenants/${tenantId}/pets`}>
              <Home className="mr-4 w-6 h-6" />
              Pets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
