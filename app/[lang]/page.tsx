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
      <p className="text-balance">{dict.homepage.introduction}</p>
      <Link href="/services" className="mt-2 block font-bold">
        Here is what i do
      </Link>
    </div>
  )
}
