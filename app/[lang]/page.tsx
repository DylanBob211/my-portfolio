import Link from 'next/link'
import { getDictionary } from './dictionaries'
import FancyButton from '../ui/fancy-button'

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
      <Link href="/services" className="mt-2 block cursor-pointer font-bold">
        <FancyButton>{dict.homepage.cta}</FancyButton>
      </Link>
    </div>
  )
}
