import { Metadata } from 'next'
import { FaLaptopCode, FaReact, FaWordpress } from 'react-icons/fa'
import { Article } from '../ui/article'

export const metadata: Metadata = {
  title: 'Services',
}

export default async function Services() {
  return (
    <div className="sm:w-2/5">
      <Article.Container>
        <FaLaptopCode size="24" />
        <Article.Title>Software Development</Article.Title>
        <Article.Paragraph>
          I specialize in full-stack web application development, building both
          intuitive user interfaces and robust back-end systems. I leverage
          cloud platforms to build scalable and reliable applications,
          optimizing performance and availability.
        </Article.Paragraph>
      </Article.Container>
      <Article.Container>
        <FaReact size="24" />
        <Article.Title>Front-end Development Consulence</Article.Title>
        <Article.Paragraph>
          With years of experience in modern front-end frameworks and libraries,
          I provide expert guidance to help you build scalable, maintainable,
          and high-performance user interfaces.
        </Article.Paragraph>
      </Article.Container>
      <Article.Container>
        <FaWordpress size="24" />
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
