import { Metadata } from 'next'
import { getDictionary } from '../dictionaries'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
}

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: 'en' | 'it' }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <main className="sm:w-2/5 lg:w-1/4">
      <ContactForm dict={dict} />
    </main>
  )
}
