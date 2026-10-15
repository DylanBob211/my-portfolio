'use server'
import EmailTemplate from '@/app/ui/email'
import { Resend } from 'resend'
import { checkFormToken } from '../formToken'

export type SendEmailResult = { ok: boolean }

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

export default async function sendEmail(
  prevState: SendEmailResult | null,
  formData: FormData
): Promise<SendEmailResult> {
  // Honeypot filled or token forged/too fast: likely a bot. Pretend it worked
  // so it learns nothing.
  if (field(formData, 'website')) return { ok: true }
  const tokenCheck = checkFormToken(formData.get('token'))
  if (tokenCheck === 'invalid' || tokenCheck === 'too-fast') return { ok: true }
  // A real person who left the page open for a long time: let them retry.
  if (tokenCheck === 'expired') return { ok: false }

  const emailData = {
    name: field(formData, 'name'),
    email: field(formData, 'email'),
    message: field(formData, 'message'),
  }
  if (
    !emailData.name ||
    emailData.name.length > 100 ||
    !EMAIL_PATTERN.test(emailData.email) ||
    emailData.email.length > 254 ||
    !emailData.message ||
    emailData.message.length > 5000
  ) {
    return { ok: false }
  }

  const { error } = await resend.emails.send({
    from: 'My contact page <onboarding@resend.dev>',
    to: 'nicoladoronzo95@gmail.com',
    subject: `${emailData.name} ti cerca`,
    react: await EmailTemplate(emailData),
  })
  return { ok: !error }
}
