import { Metadata } from 'next'
import { Article } from '../ui/article'
import { motion } from 'motion/react'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function Contact() {
  return (
    <Article.Container>
      <Article.Title>Contact Me</Article.Title>
      <form className="mt-4 flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="font-medium text-black">Your Name</span>
          <input
            type="text"
            name="name"
            className="rounded border border-black bg-white p-2 text-black transition-all ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Enter your name"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium text-black">Your Email</span>
          <input
            type="email"
            name="email"
            className="rounded border border-black bg-white p-2 text-black transition-all ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Enter your email"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium text-black">Message</span>
          <textarea
            name="message"
            className="rounded border border-black bg-white p-2 text-black transition-all ease-in-out focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Enter your message"
            rows={5}
          />
        </label>
        <button
          type="submit"
          className="rounded border border-black p-2 text-black transition-all ease-in-out hover:bg-black hover:text-white active:scale-95"
        >
          Send Message
        </button>
      </form>
    </Article.Container>
  )
}
