// import { SignOutButton } from "@clerk/nextjs";
import SignOut from "../components/ui/signout";
import { DashboardOverviewPanel } from "./components/dashboardOverviewPanel";

type Props = {};
const DashboardPage = (props: Props) => {
  return (
    <section className="my-12 overflow-hidden ">
      <div>
        <div className="flex justify-between px-4">
          <h1 className="text-primary-foreground text-2xl font-medium">
            Dashboard
          </h1>
        </div>
        <div className="seperator"></div>
      </div>

      <DashboardOverviewPanel />
    </section>
  );
};
export default DashboardPage;
