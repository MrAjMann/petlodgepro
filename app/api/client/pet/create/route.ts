import { db } from '@/lib/db';
import { users, pets } from '@/lib/db/schema';

import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  const body = await req.json()

  const {
    ownerId,
    petName,
    petType,
    petBreed,
    petAge,
    petVaxStatus,
    petTemperament,
      petMedicalConditions,
     } = body
  
  
 
  
  const petId = await db.insert(pets).values({
    ownerId,
    petName,
    petType,
    petBreed,
    petAge,
    petVaxStatus,
    petTemperament,
    petMedicalConditions

  }).returning({
    insertedId: pets.id
  })
  
  return NextResponse.json({
    petId: petId[0].insertedId
  })

}