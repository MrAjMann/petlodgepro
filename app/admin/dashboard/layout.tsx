import { AdminSidebar } from "../components/nav/sidebar/adminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid lg:grid-cols-5 2xl:grid-cols-8 ">
      <AdminSidebar className="hidden md:block lg:border-r" />
      <div className="col-span-1 lg:col-span-4 2xl:col-span-7 ">
        <div className="h-full px-4 py-4 lg:px-8  2xl:mx-48">{children}</div>
      </div>
    </section>
  );
}
