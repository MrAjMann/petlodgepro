import { Sidebar } from "./components/nav/sidebar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid lg:grid-cols-5 ">
      <Sidebar className="hidden md:block lg:border-r" />
      <div className="col-span-3 lg:col-span-4 ">
        <div className="h-full px-4 py-6 lg:px-8">{children}</div>
      </div>
    </section>
  );
}
