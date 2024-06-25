import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.string(),
  APP_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  SENDGRID_EMAIL_ADDRESS: z.string().email(),
  SENDGRID_API_KEY: z.string(),
  ADMIN_USERNAME: z.string(),
  ADMIN_NAME: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  SOCKETIO_SERVER_PORT: z.coerce.number(),
  SOCKETIO_SERVER_PATH: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>
