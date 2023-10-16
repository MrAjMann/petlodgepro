import { db } from '@/lib/db';
import { UserType, users } from '@/lib/db/schema';
import { authOptions } from '@/lib/utils/authOptions';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';




export async function GET(req: Request) {

  const session = await getServerSession(authOptions)
  const user = await db.select().from(users).where(eq(users.tenantId, session?.user.tenantId!))

  const StaffOnlyUsers = user.filter(
    (users) => users.role === "STAFF" || users.role === "TENANT"
  );
  
  return NextResponse.json(StaffOnlyUsers)

}