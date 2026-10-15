import FancyButton from '@/app/ui/fancy-button'
import { Metadata } from 'next'
import Link from 'next/link'
import { FaChalkboardTeacher, FaUsers } from 'react-icons/fa'
import { FaComputer } from 'react-icons/fa6'
import { FiDatabase } from 'react-icons/fi'
import { RiReactjsLine } from 'react-icons/ri'
import { SiAngular } from 'react-icons/si'
import { Article } from '../../ui/article'
import { getDictionary } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Services',
}

export default async function Services({
  params,
}: {
  params: Promise<{ lang: string }>
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
          <FaChalkboardTeacher size="26" />
          <FaUsers size="24" />
        </div>
        <Article.Title>{dict.services.teaching.title}</Article.Title>
        <Article.Paragraph>
          {dict.services.teaching.description}
        </Article.Paragraph>
      </Article.Container>

      <div className="mt-4">
        <Link href="/contact" className="cursor-pointer font-bold">
          <FancyButton>{dict.services.cta}</FancyButton>
        </Link>
      </div>
    </div>
  )
}
