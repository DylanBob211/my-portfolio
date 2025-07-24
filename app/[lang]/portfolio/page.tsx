import { Metadata } from 'next'
import { getDictionary } from '../dictionaries'
import PortfolioClient from './portfolio-client'
import portfolioData from '../../data/portfolio.json'

export const metadata: Metadata = {
  title: 'Portfolio',
}

export default async function Portfolio({
  params,
}: {
  params: Promise<{ lang: 'en' | 'it' }>
}) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PortfolioClient
        dict={dict}
        portfolioData={portfolioData}
        lang={resolvedParams.lang}
      />
    </div>
  )
}
