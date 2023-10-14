import { eq } from "drizzle-orm";
import TenantProfle from "./form";
import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";

type Props = {
  params: {
    id: string;
  };
};

const UserProfilePage = async ({ params }: Props) => {
  const res = await db
    .select()
    .from(users)
    .where(eq(users.tenantId, params.id));

  const user = res[0];
  if (params.id === user?.tenantId || user) {
    if (user.role === "CLIENT") {
      return (
        <div>
          <div>
            <h1>Client View</h1>
            <TenantProfle user={user} />
          </div>
        </div>
      );
    } else if (user.role === "STAFF") {
      return (
        <div>
          <div>
            <h1>Staff View</h1>
            <TenantProfle user={user} />
          </div>
        </div>
      );
    }
  }
};
export default UserProfilePage;
