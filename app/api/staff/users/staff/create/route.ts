import { db } from '@/lib/db';
import {  users } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';


export async function POST(req: Request) {
  const body = await req.json()

  
  
  const { name, email, password,role } = await body
  const newEmail = email




  
  const response = await db
    .select()
    .from(users).where(eq(users.email, newEmail))
  
    if (response[0]) {
      
      return NextResponse.json(null)
      
    }
 


  const user_id = await db.insert(users).values({
    name,
    email,
    password,
    role,
    tenantId: 'd0a034f2-e0e2-4000-b81e-1ab6d7ac8510',
  }).returning({
    insertedId: users.id
  })

  return NextResponse.json({
    userId: user_id[0].insertedId
  })

}