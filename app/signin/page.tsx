import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/utils/authOptions";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  const tenantId = await session?.user.tenantId;
  if (session?.user) {
    // console.log("signin tenant", tenantId);
    redirect(`/tenants/${tenantId}/profile`);
  }
  return <Form />;
}
