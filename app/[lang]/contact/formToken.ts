import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'

// A human needs at least a few seconds to fill in the form; bots usually don't wait.
const MIN_AGE_MS = 3_000
const MAX_AGE_MS = 24 * 60 * 60 * 1000

export type TokenCheck = 'valid' | 'too-fast' | 'expired' | 'invalid'

function sign(payload: string) {
  const secret = process.env.CONTACT_FORM_SECRET
  if (!secret) throw new Error('CONTACT_FORM_SECRET is not set')
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createFormToken(now = Date.now()) {
  const issuedAt = String(now)
  return `${issuedAt}.${sign(issuedAt)}`
}

export function checkFormToken(token: unknown, now = Date.now()): TokenCheck {
  if (typeof token !== 'string') return 'invalid'
  const [issuedAt, signature] = token.split('.')
  if (!issuedAt || !signature) return 'invalid'

  const expected = Buffer.from(sign(issuedAt))
  const received = Buffer.from(signature)
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return 'invalid'
  }

  const age = now - Number(issuedAt)
  if (age < MIN_AGE_MS) return 'too-fast'
  if (age > MAX_AGE_MS) return 'expired'
  return 'valid'
}
