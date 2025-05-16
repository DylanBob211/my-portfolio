import { Metadata } from 'next'
import { FaWordpressSimple } from 'react-icons/fa'
import { FaComputer } from 'react-icons/fa6'
import { FiDatabase } from 'react-icons/fi'
import { RiReactjsLine } from 'react-icons/ri'
import { SiAngular } from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'
import { Article } from '../../ui/article'
import { getDictionary } from '../dictionaries'
import { FaCss3 } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Services',
}

export default async function Services({
  params,
}: {
  params: Promise<{ lang: 'en' | 'it' }>
}) {
  const dict = await getDictionary((await params).lang)

  return (
    <div className="sm:w-2/5">
      <Article.Container>
        <div className="flex items-center gap-2">
          <FaComputer size="28" />
          <FiDatabase size="24" />
        </div>
        <Article.Title>{dict.services.webappDevelopment.title}</Article.Title>
        <Article.Paragraph>
          {dict.services.webappDevelopment.description}
        </Article.Paragraph>
      </Article.Container>
      <Article.Container>
        <div className="flex items-center gap-2">
          <RiReactjsLine size="28" />
          <SiAngular size="24" />
        </div>
        <Article.Title>{dict.services.frontendDevelopment.title}</Article.Title>
        <Article.Paragraph>
          {dict.services.frontendDevelopment.description}
        </Article.Paragraph>
      </Article.Container>
      <Article.Container>
        <div className="flex items-center gap-2">
          <FaCss3 size="24" />
          <FaWordpressSimple size="24" />
        </div>
        <Article.Title>{dict.services.websitesDevelopment.title}</Article.Title>
        <Article.Paragraph>
          {dict.services.websitesDevelopment.description}
        </Article.Paragraph>
      </Article.Container>
    </div>
  )
}
