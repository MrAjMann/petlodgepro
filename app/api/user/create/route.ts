import { db } from '@/lib/db';
import {  users } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';


export async function POST(req: Request) {
  const body = await req.json()

  
  
  const { name, email, password } = await body
  const newEmail = email



  const response = await db
    .select()
    .from(users).where(eq(users.email, newEmail))
  
    if (response[0]) {
      console.log('route response',response)
      return NextResponse.json(null)
      
    }
 


  const user_id = await db.insert(users).values({
    name,
    email,
    password,
    
  }).returning({
    insertedId: users.id
  })

  return NextResponse.json({
    userId: user_id[0].insertedId
  })

}