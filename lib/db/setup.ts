import { promises as fs } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import dotenv from 'dotenv';
import { db } from './drizzle';
import { sql } from 'drizzle-orm';

// Load existing env variables
dotenv.config();

function generateAuthSecret(): string {
  console.log('Step 1: Generating AUTH_SECRET...');
  return crypto.randomBytes(32).toString('hex');
}

async function verifyDatabaseConnection() {
  console.log('Step 2: Verifying database connection...');
  try {
    // Simple query to test connection
    await db.execute(sql`SELECT 1`);
    console.log('✓ Database connection successful');
  } catch (error) {
    console.error('Error connecting to database:', error);
    console.log('\nPlease check your POSTGRES_URL in .env file');
    process.exit(1);
  }
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log('Step 3: Checking environment variables...');
  
  const existingEnv = await fs.readFile(path.join(process.cwd(), '.env'), 'utf-8');
  const envLines = existingEnv.split('\n');
  let needsUpdate = false;

  // Only update if variable is missing or empty
  Object.entries(envVars).forEach(([key, value]) => {
    const exists = envLines.some(line => {
      const [k, v] = line.split('=');
      return k === key && v && v.trim();
    });
    if (!exists) {
      needsUpdate = true;
      envLines.push(`${key}=${value}`);
    }
  });

  if (needsUpdate) {
    await fs.writeFile(path.join(process.cwd(), '.env'), envLines.join('\n'));
    console.log('✓ Added missing environment variables');
  } else {
    console.log('✓ All required environment variables exist');
  }
}

async function main() {
  console.log('🚀 Starting database setup...\n');

  // Only generate new AUTH_SECRET if it doesn't exist
  const AUTH_SECRET = process.env.AUTH_SECRET || generateAuthSecret();
  
  // Verify database connection using existing POSTGRES_URL
  await verifyDatabaseConnection();

  // Update env file if needed
  await writeEnvFile({
    AUTH_SECRET,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  });

  console.log('\n✨ Setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Run migrations: pnpm db:migrate');
  console.log('2. Seed the database: pnpm db:seed');
  console.log('3. Start the development server: pnpm dev');
  process.exit(0);
}

main().catch(console.error);
