import { db } from '@/lib/db';
import { tenants } from '@/lib/db/schema';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  const body = await req.json()

  const { tenantName, tenantEmail } = body
  

  const tenant_ids = await db.insert(tenants).values({
    tenantName,
    tenantEmail
  }).returning({
    insertedId: tenants.id
  })

  return NextResponse.json({
    tenantId: tenant_ids[0].insertedId
  })

}