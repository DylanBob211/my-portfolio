import Link from 'next/link'
import { getDictionary } from './dictionaries'

export default async function Home({
  params,
}: {
  params: { lang: 'en' | 'it' }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="w-1/2 sm:w-2/5 lg:w-1/5">
      <p className="text-balance">
        I&apos;m a full-stack web developer with a front-end focus. <br />I love
        realizing visually compelling web experiences and I love generative art.
      </p>
      <Link href="/services" className="mt-2 block font-bold">
        Here is what i do
      </Link>
    </div>
  )
}
