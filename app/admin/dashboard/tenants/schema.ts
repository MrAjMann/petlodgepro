import { z } from "zod"


export const tenantSchema = z.object({
  id: z.string().nonempty(),
  tenantName: z.string(),
  tenantEmail: z.string(),


})

export type Tenant = z.infer<typeof tenantSchema>