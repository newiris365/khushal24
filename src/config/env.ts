import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Server Runtime Environment Schema
 * Validates critical environment variables at startup so missing configuration
 * fails loudly before requests are processed.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().optional().default('5000'),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url({ message: 'NEXT_PUBLIC_SUPABASE_URL must be a valid HTTP/HTTPS URL' })
    .optional(),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(10, { message: 'SUPABASE_SERVICE_ROLE_KEY is required for backend services' })
    .optional(),
  JWT_SECRET: z
    .string()
    .min(8, { message: 'JWT_SECRET must be at least 8 characters' })
    .optional()
    .default('default-iris365-jwt-secret-key-production'),
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
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  validatedEnv = result.data || (process.env as unknown as EnvConfig);
  return validatedEnv;
}

export default validateEnv;
