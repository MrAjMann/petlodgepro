import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { authOptions } from '@/lib/utils/authOptions';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';



export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  
  const user = await db.select().from(users).where(eq(users.email, session?.user.email!))
  return user
}