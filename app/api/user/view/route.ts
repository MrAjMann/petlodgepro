import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';





export async function POST(req: Request) {
  const body = await req.json()
  const { email } = await body
const newEmail = email
  // const user = await db.select().from(users);
  
  
  
    const response = await db.select().from(users).where(eq(users.email, newEmail));
    

    
    if (!response[0]) {
      console.log('route response',response)
      return NextResponse.json(null)
      
    }
    return NextResponse.json(response[0].email)
  }
  
