import { z } from 'zod'

const envSchema = z.object({
  apiHost: z.string().url(),

  googleClientId: z.string(),
})

export const env = envSchema.parse({
  apiHost: process.env.PLASMO_PUBLIC_API_HOST,

  googleClientId: process.env.PLASMO_PUBLIC_GOOGLE_CLIENT_ID,
})
