import Link from 'next/link'
import { getDictionary } from './dictionaries'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'it' }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <div className="w-1/2 sm:w-2/5 lg:w-1/5">
      <p className="text-balance">{dict.homepage.introduction}</p>
      <Link href="/services" className="mt-2 block font-bold">
        {dict.homepage.cta}
      </Link>
    </div>
  )
}
