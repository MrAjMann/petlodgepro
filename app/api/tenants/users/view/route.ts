import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { authOptions } from '@/lib/utils/authOptions';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// View Users



export async function POST(req: Request) {

  const session = await getServerSession(authOptions)
  
  
    const response = await db.select().from(users).where(eq(users.tenantId, session?.user.tenantId!));
    

    
    if (!response[0]) {
      // console.log('route response',response)
      return NextResponse.json(null)
      
    }
    return NextResponse.json(response[0])
  }
  
