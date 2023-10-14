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

  const { name, email } = await body
 

  const updatedUserDetails: { updatedEmail: string}[] = await db.update(users).set({
    name: name,
    email: email,

  }).where(eq(
    users.email, currentEmail
    )
  ).returning({
     updatedEmail: users.email,
     
  })

  // console.log('confirmed update')
  return NextResponse.json({
    updatedUserDetails
    
  })

}