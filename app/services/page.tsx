import { Metadata } from 'next'
import { FaWordpressSimple } from 'react-icons/fa'
import { FaComputer } from 'react-icons/fa6'
import { FiDatabase } from 'react-icons/fi'
import { RiReactjsLine } from 'react-icons/ri'
import { SiAngular } from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'
import { Article } from '../ui/article'

export const metadata: Metadata = {
  title: 'Services',
}

export default async function Services() {
  return (
    <div className="sm:w-2/5">
      <Article.Container>
        <div className="flex items-center gap-2">
          <FaComputer size="28" />
          <FiDatabase size="24" />
        </div>
        <Article.Title>Software Development</Article.Title>
        <Article.Paragraph>
          I specialize in full-stack web application development, building both
          intuitive user interfaces and robust back-end systems. I leverage
          cloud platforms to build scalable and reliable applications,
          optimizing performance and availability.
        </Article.Paragraph>
      </Article.Container>
      <Article.Container>
        <div className="flex items-center gap-2">
          <RiReactjsLine size="28" />
          <SiAngular size="24" />
        </div>
        <Article.Title>Front-end Development Consulence</Article.Title>
        <Article.Paragraph>
          With years of experience in modern front-end frameworks and libraries,
          I provide expert guidance to help you build scalable, maintainable,
          and high-performance user interfaces.
        </Article.Paragraph>
      </Article.Container>
      <Article.Container>
        <div className="flex items-center gap-2">
          <TbBrandNextjs size="28" />
          <FaWordpressSimple size="24" />
        </div>
        <Article.Title>Websites development</Article.Title>
        <Article.Paragraph>
          I create websites tailored to your needs, ranging from simple, elegant
          designs to complex, feature-rich platforms. Whether you need a
          personal blog, a portfolio, or a fully customized business website, I
          ensure a seamless user experience and responsive design.
        </Article.Paragraph>
      </Article.Container>
    </div>
  )
}
