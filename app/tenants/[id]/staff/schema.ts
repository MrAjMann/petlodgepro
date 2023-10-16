import { z } from "zod"


export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
  tenantId: z.string(),
  password: z.string().nonempty(),

})

export type User = z.infer<typeof userSchema>