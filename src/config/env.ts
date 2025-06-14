import { z } from "zod";

/**
 * Environment variable schema definition
 * This schema defines the shape and validation rules for our environment variables
 */
const envSchema = z.object({
  // Application Environment
  VITE_NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  
  // Base URL Configuration
  VITE_BASEURL: z.string().url(),
  
  // Supabase Configuration
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, "Supabase anonymous key is required"),
});

/**
 * Type definition for our environment variables
 * This is inferred from the schema above
 */
type Env = z.infer<typeof envSchema>;

/**
 * Validates and parses environment variables
 * @throws {Error} If required environment variables are missing or invalid
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err: z.ZodIssue) => err.path.join(".")).join(", ");
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * This object will throw an error if any required environment variables are missing
 */
export const env = validateEnv(); 