import { config } from 'dotenv';
import { z } from 'zod';

const Env = process.env.NODE_ENV;

Env === 'test' ? config({ path: '.env.test' }) : config();

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	DATABASE_CLIENT:
		Env === 'test' ? z.string().optional() : z.enum(['sqlite', 'pg']),
	DATABASE_URL: z.string(),
	DATABASE_NAME: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_HOST: z.string(),
	DATABASE_USER: z.string(),
	DATABASE_PORT: z.coerce.number().default(5432),
	PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error('Invalid environment variables!', _env.error.format());

	throw new Error('Invalid environment variables.');
}

export const env = _env.data;
