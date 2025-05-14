import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function Contact() {
  return (
    <main className="sm:w-2/5 lg:w-1/5">
      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span>Your Name</span>
          <input
            type="text"
            name="name"
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Enter your name"
          />
        </label>
        <label className="flex flex-col">
          <span>Your Email</span>
          <input
            type="email"
            name="email"
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Enter your email"
          />
        </label>
        <label className="flex flex-col">
          <span>Message</span>
          <textarea
            name="message"
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Enter your message"
            rows={5}
          />
        </label>
        <button
          type="submit"
          className="rounded border border-gray-400 p-2 transition ease-in-out hover:bg-black hover:text-white active:scale-95"
        >
          Send Message
        </button>
      </form>
    </main>
  )
}
