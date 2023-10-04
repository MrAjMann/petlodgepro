import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, HomeIcon } from "lucide-react";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="my-8 px-4 text-xl font-semibold tracking-tight text-gray-200">
            PetLodge Pro
          </h2>
          <div className="space-y-1">
            <Link className="sidebar-link" href={"/dashboard/tenants"}>
              <Home className="mr-2 w-4 h-4" />
              Tenants
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
