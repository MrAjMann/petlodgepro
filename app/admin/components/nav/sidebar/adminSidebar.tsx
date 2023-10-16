"use client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, DollarSign, Home, HomeIcon, User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className }: SidebarProps) {
  const { data: session, status } = useSession();

  return (
    <div className={cn("pb-12 min-h-screen ", className)}>
      <div className="space-y-4 py-4">
        <div className=" px-3 py-2">
          <div className="my-8 px-4 ">
            <h2 className="text-3xl font-bold tracking-tight text-gray-300">
              PetLodge Pro
            </h2>

            {session && session.user && (
              <p className="text-muted-foreground">
                Hello{" "}
                <span className="font-medium text-sm ">
                  {" "}
                  {session?.user?.firstName}!{" "}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-4">
        {session?.user && (
          <div className="space-y-8 flex flex-col">
            <Link className="sidebar-link" href={"/dashboard"}>
              <Home className="mr-4 w-6 h-6" />
              Dashboard
            </Link>
            <Link className="sidebar-link" href={"/dashboard/tenants"}>
              <Home className="mr-4 w-6 h-6" />
              Tenants
            </Link>
            <Link className="sidebar-link" href={"/dashboard/performance"}>
              <Activity className="mr-4 w-6 h-6" />
              Performance Metrics
            </Link>
            <Link className="sidebar-link" href={"/dashboard/usermetrics"}>
              <User className="mr-4 w-6 h-6" />
              User Metrics
            </Link>
            <Link className="sidebar-link" href={"/dashboard/finance"}>
              <DollarSign className="mr-4 w-6 h-6" />
              Financial Metrics
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
