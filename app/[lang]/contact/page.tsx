import { Metadata } from 'next'
import { getDictionary } from '../dictionaries'
import { Resend } from 'resend'
import EmailTemplate from '@/app/ui/email'

export const metadata: Metadata = {
  title: 'Contact',
}

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: 'en' | 'it' }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)
  async function sendEmail(formData: FormData) {
    'use server'
    const emailData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }
    await resend.emails.send({
      from: 'My contact page',
      to: 'nicoladoronzo95@gmail.com',
      subject: `${emailData.name} ti cerca`,
      react: await EmailTemplate(emailData),
    })
  }
  return (
    <main className="sm:w-2/5 lg:w-1/5">
      <form action={sendEmail} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span>{dict.contact.nameLabel}</span>
          <input
            type="text"
            name="name"
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder={dict.contact.namePlaceholder}
          />
        </label>
        <label className="flex flex-col">
          <span>{dict.contact.emailLabel}</span>
          <input
            type="email"
            name="email"
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder={dict.contact.emailPlaceholder}
          />
        </label>
        <label className="flex flex-col">
          <span>{dict.contact.messageLabel}</span>
          <textarea
            name="message"
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder={dict.contact.messagePlaceholder}
            rows={5}
          />
        </label>
        <button
          type="submit"
          className="rounded border border-gray-400 p-2 transition ease-in-out hover:bg-black hover:text-white active:scale-95"
        >
          {dict.contact.submitButton}
        </button>
      </form>
    </main>
  )
}
