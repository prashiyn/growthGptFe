import { sql } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { users } from '../schema';

export async function up(db: any) {
  await db.schema.alterTable(users).addColumn(
    'first_name',
    varchar('first_name', { length: 100 })
  );
  
  await db.schema.alterTable(users).addColumn(
    'last_name',
    varchar('last_name', { length: 100 })
  );

  // Migrate existing data: split name into first_name and last_name
  await sql`
    UPDATE users 
    SET 
      first_name = SPLIT_PART(name, ' ', 1),
      last_name = SUBSTRING(name FROM POSITION(' ' IN name) + 1)
    WHERE name IS NOT NULL
  `;
}

export async function down(db: any) {
  await db.schema.alterTable(users).dropColumn('first_name');
  await db.schema.alterTable(users).dropColumn('last_name');
} 