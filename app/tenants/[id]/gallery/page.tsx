import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: {
    id: string;
  };
};

const UserPetGalleryPage = async ({ params }: Props) => {
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
            <h1>View Pet Gallery</h1>
          </div>
        </div>
      );
    }
  }
};
export default UserPetGalleryPage;
