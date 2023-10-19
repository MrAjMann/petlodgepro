import { pgTable,timestamp,varchar,integer, primaryKey, text, serial, pgEnum,boolean } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from "@auth/core/adapters"



export const tenants = pgTable("tenants", {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()).notNull(),
  tenantName: varchar("tenantName", { length: 255 }).notNull(),
  tenantEmail: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt", {mode: 'string'}).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", {mode: 'string'}).notNull().defaultNow()
})


export const pets = pgTable("pets", {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()).notNull(),
  ownerId: text('ownerId').notNull().references(() => users.id),
  petName: varchar("petName", { length: 255 }).notNull(),
  petType: text("petType").notNull(),
  petBreed: varchar("petBreed", { length: 255 }).notNull().default("unknown"),
  petAge: integer("petAge"),
  petVaxStatus: boolean("petVaxStatus").default(true),
  petTemperament: text("petTemperament"),
  petMedicalConditions: text("petMedicalConditions"),
  petImages: text("petImages"),
  createdAt: timestamp("createdAt", {mode: 'string'}).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", {mode: 'string'}).notNull().defaultNow()
})

export const roleEnum = pgEnum('role', ['PLPADMIN','TENANT','STAFF', 'CLIENT'])

export const users = pgTable("user", {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()).notNull(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email").unique().notNull(),
  tenantId: text('tenantId').notNull().references(() => tenants.id),
  password: text("password").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum('role').default('CLIENT'),
  
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId)
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull()
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
)



// Add StaffSchema



// Add ClientsSchema


// Add PetsSchema

export type TenantType = typeof tenants.$inferInsert
export type UserType = typeof users.$inferInsert
export type PetType = typeof pets.$inferInsert