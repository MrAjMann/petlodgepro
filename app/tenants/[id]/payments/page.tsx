import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: {
    id: string;
  };
};

const UserPaymentsPage = async ({ params }: Props) => {
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
            <h1>View Payment History</h1>
          </div>
        </div>
      );
    }
  }
};
export default UserPaymentsPage;
