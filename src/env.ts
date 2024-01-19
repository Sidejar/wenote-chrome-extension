import { z } from 'zod'

const envSchema = z.object({
  id: z.string(),
  apiHost: z.string().url(),

  googleClientId: z.string(),
})

export const env = envSchema.parse({
  id: process.env.NEXT_PUBLIC_API_HOST,
  apiHost: process.env.PLASMO_PUBLIC_API_HOST,

  googleClientId: process.env.PLASMO_PUBLIC_GOOGLE_CLIENT_ID,
})
