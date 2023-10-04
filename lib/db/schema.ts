import { pgTable,serial,timestamp,varchar,integer } from 'drizzle-orm/pg-core';


export const $tenants = pgTable("tenants", {
  id: integer('id').primaryKey(),
  tenantName: varchar("tenantName", { length: 255 }).notNull(),
  tenantEmail: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt", {mode: 'string'}).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", {mode: 'string'}).notNull().defaultNow()
})


// Add StaffSchema



// Add ClientsSchema


// Add PetsSchema

export type TenantType = typeof $tenants.$inferInsert