import { db } from '@/lib/db';
import {  users } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/authOptions';



export async function POST(req: Request) {

  const session = await getServerSession(authOptions)
  
  const res = await db.select().from(users).where(eq(users.email, session?.user.email!))
 
const currentEmail  = res[0].email

  const body = await req.json()

  const { firstName,lastName, email } = await body
 

  const updatedUserDetails: { updatedEmail: string}[] = await db.update(users).set({
    firstName: firstName,
    lastName: lastName,
    email: email,

  }).where(eq(
    users.email, currentEmail
    )
  ).returning({
     updatedEmail: users.email,
     
  })

  
  return NextResponse.json({
    updatedUserDetails
    
  })

}