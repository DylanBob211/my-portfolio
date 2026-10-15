import { Metadata } from 'next'
import { getDictionary } from '../dictionaries'
import { ContactForm } from './contact-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const dict = await getDictionary((await params).lang)
  return { title: dict.nav.contact }
}

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <main className="sm:w-2/5 lg:w-1/4">
      <p className="mb-4">{dict.contact.introduction}</p>
      <ContactForm dict={dict} />
    </main>
  )
}
