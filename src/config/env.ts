import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Server Runtime Environment Schema
 * Strictly validates required environment variables at boot time.
 * If any required variables are missing or invalid, validateEnv() fails loudly
 * and exits the process immediately.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().optional().default('4000'),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string({ required_error: 'NEXT_PUBLIC_SUPABASE_URL is required' })
    .url({ message: 'NEXT_PUBLIC_SUPABASE_URL must be a valid HTTP/HTTPS URL' }),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string({ required_error: 'SUPABASE_SERVICE_ROLE_KEY is required' })
    .min(32, { message: 'SUPABASE_SERVICE_ROLE_KEY must be a valid JWT key (min 32 chars)' }),
  JWT_SECRET: z
    .string({ required_error: 'JWT_SECRET is required' })
    .min(32, {
      message: 'JWT_SECRET is required and must be at least 32 characters for security signature validation'
    }),
  DATABASE_URL: z.string().optional()
});

export type EnvConfig = z.infer<typeof envSchema>;

let validatedEnv: EnvConfig;

export function validateEnv(): EnvConfig {
  if (validatedEnv) return validatedEnv;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ FATAL: Invalid Server Environment Configuration:');
    console.error(JSON.stringify(result.error.flatten().fieldErrors, null, 2));

    if (process.env.NODE_ENV !== 'test') {
      console.error('💥 Server boot halted due to missing required environment variables.');
      process.exit(1);
    }
  }

  validatedEnv = (result.success ? result.data : process.env) as EnvConfig;
  return validatedEnv;
}

export default validateEnv;
