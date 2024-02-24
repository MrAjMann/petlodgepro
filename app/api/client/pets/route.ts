import { db } from '@/lib/db';
import { pets, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { tenantId: string } }
) {
  try {


    const allPets = await db.select().from(pets);


    return NextResponse.json(allPets);
  } catch (error) {
    // console.log('[PETS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};