'use server'
import EmailTemplate from '@/app/ui/email'
import { CreateEmailResponse, Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
export default async function sendEmail(
  prevState: CreateEmailResponse | null,
  formData: FormData
): Promise<CreateEmailResponse> {
  const emailData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  }
  return resend.emails.send({
    from: 'My contact page <onboarding@resend.dev>',
    to: 'nicoladoronzo95@gmail.com',
    subject: `${emailData.name} ti cerca`,
    react: await EmailTemplate(emailData),
  })
}
