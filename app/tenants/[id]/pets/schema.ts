import { z } from "zod"


export const PetsSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  petName: z.string(),
  petType: z.string(),
  petBreed: z.string(),
  petAge: z.string(),
  petVaxStatus: z.boolean(),
  petTemperament: z.string(),
  petMedicalConditions: z.string(),

})

export type Pets = z.infer<typeof PetsSchema>