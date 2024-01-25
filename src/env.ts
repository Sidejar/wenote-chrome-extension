import { z } from 'zod'

const envSchema = z.object({
  apiHost: z.string().url(),
  crxId: z.string(),
  googleClientId: z.string(),
})

export const env = envSchema.parse({
  apiHost: process.env.PLASMO_PUBLIC_API_HOST,
  crxId: process.env.PLASMO_PUBLIC_CRX_ID,
  googleClientId: process.env.PLASMO_PUBLIC_GOOGLE_CLIENT_ID,
})
