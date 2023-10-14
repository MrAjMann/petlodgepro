import { db } from "@/lib/db";
import { Sidebar } from "./components/nav/sidebar/sidebar";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid lg:grid-cols-6 2xl:grid-cols-7 ">
      <Sidebar className="hidden md:block lg:border-r" />
      <div className="col-span-1 lg:col-span-5 2xl:col-span-6 ">
        <div className="h-full px-4 py-4 lg:px-8  2xl:mx-48">{children}</div>
      </div>
    </section>
  );
}
