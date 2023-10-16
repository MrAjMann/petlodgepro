import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  
    if (session?.user && session.user.role === "CLIENT") {
      redirect(`/tenants/${session.user.tenantId}/profile`);
    }
    if (session?.user && session.user.role === "STAFF") {
      redirect(`/tenants/${session.user.tenantId}/dashboard`);
    }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>PetLodgePro</h1>
    </main>
  );
}
