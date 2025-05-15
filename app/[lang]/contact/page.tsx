import { Metadata } from 'next'
import { getDictionary } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Contact',
}

export default async function Contact({
  params,
}: {
  params: { lang: 'en' | 'it' }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <main className="sm:w-2/5 lg:w-1/5">
      <form className="flex flex-col gap-4">
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
