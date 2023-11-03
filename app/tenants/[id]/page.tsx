import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { StaffOverviewPanel } from "../components/staffOverviewPanel";

type Props = {
  params: {
    id: string;
  };
};

const StaffDashboardPage = async ({ params }: Props) => {
  const res = await db
    .select()
    .from(users)
    .where(eq(users.tenantId, params.id));

  const user = res[0];
  if (params.id === user?.tenantId || user) {
    if (user.role === "STAFF" || user.role === "TENANT") {
      return (
        <div>
          <div>
            <h1>View Staff Dashboard</h1>
          </div>
          <div className="">
            <StaffOverviewPanel />
          </div>
        </div>
      );
    }
  }
};
export default StaffDashboardPage;
