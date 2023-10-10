import { neon, neonConfig } from '@neondatabase/serverless'
// import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-http'
// import { migrate } from 'drizzle-orm/neon-http/migrator';

neonConfig.fetchConnectionCache = true


const sql = neon(process.env.DATABASE_URL!)


export const db = drizzle(sql);
export type DBCLIENT = typeof db


// this will automatically run needed migrations on the database
// migrate(db, { migrationsFolder: './lib/db/migrations' });