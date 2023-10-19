import { Sidebar } from "./components/nav/sidebar/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-6 2xl:grid-cols-7  ">
      <Sidebar className="min-h-screen  hidden xl:block lg:border-r overflow-hidden" />
      <div className="col-span-1 lg:col-span-6 2xl:col-span-6 ">
        <div className=" px-4 py-4 lg:px-8 mx-auto ">{children}</div>
      </div>
    </section>
  );
}
