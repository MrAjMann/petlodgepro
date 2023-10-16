import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  const body = await req.json()

  const {
    tenantId,
    firstName,
    lastName,
    email,
    staffPermsions,
    password
     } = body
  
  

  
  const userId = await db.insert(users).values({
    tenantId,
    firstName,
    lastName,
    email,
    password,
    role: staffPermsions ? "TENANT" : "STAFF"
   

  }).returning({
    insertedId: users.id
  })

  return NextResponse.json({
    userId: userId[0].insertedId
  })

}