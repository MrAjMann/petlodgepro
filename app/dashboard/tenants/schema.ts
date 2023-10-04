import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tenantSchema = z.object({
  id: z.number(),
  tenantName: z.string(),
  tenantEmail: z.string(),

})

export type Tenant = z.infer<typeof tenantSchema>