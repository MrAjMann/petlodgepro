import { Pool } from '@neondatabase/serverless'
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-serverless';


const connectionString = process.env.DATABASE_URL!;
if (!connectionString) {
    console.error("Environment Variables:", process.env!); // Log all environment variables for debugging
}


const pool = new Pool({ connectionString });


export const db = drizzle(pool, { schema });
export type DBCLIENT = typeof db


// this will automatically run needed migrations on the database
// migrate(db, { migrationsFolder: './lib/db/migrations' });