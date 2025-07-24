'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Article } from '../../ui/article'

type PortfolioItem = {
  id: string
  period: {
    start: string
    end: string
  }
  title: {
    it: string
    en: string
  }
  role: {
    it: string
    en: string
  }
  description: {
    it: string
    en: string
  }
  results: {
    it: string
    en: string
  }
  technologies: string[]
}

type PortfolioData = {
  professional: PortfolioItem[]
  personal: PortfolioItem[]
}

type Dictionary = {
  portfolio: {
    title: string
    filterPlaceholder: string
    allProjects: string
    professional: string
    personal: string
    technologies: string
    role: string
    period: string
    results: string
    ongoing: string
    showMoreTechnologies: string
    showLessTechnologies: string
    clearFilters: string
    noProjectsFound: string
  }
}

interface PortfolioClientProps {
  dict: Dictionary
  portfolioData: PortfolioData
  lang: 'en' | 'it'
}

export default function PortfolioClient({
  dict,
  portfolioData,
  lang,
}: PortfolioClientProps) {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState<
    'all' | 'professional' | 'personal'
  >('all')
  const [showAllTechnologies, setShowAllTechnologies] = useState(false)

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    portfolioData.professional.forEach((item) =>
      item.technologies.forEach((tech) => techSet.add(tech))
    )
    portfolioData.personal.forEach((item) =>
      item.technologies.forEach((tech) => techSet.add(tech))
    )

    const priorityTechnologies = [
      'Angular',
      'React',
      'Next.js',
      'React Router',
      'Remix',
      'Typescript',
      'C#',
      'Node.js',
    ]

    const allTechArray = Array.from(techSet)
    const priorityTech = priorityTechnologies.filter((tech) =>
      allTechArray.includes(tech)
    )
    const otherTech = allTechArray
      .filter((tech) => !priorityTechnologies.includes(tech))
      .sort()

    return [...priorityTech, ...otherTech]
  }, [portfolioData])

  // Filter projects based on selected technologies and section
  const filteredProjects = useMemo(() => {
    let allProjects: PortfolioItem[] = []

    if (activeSection === 'all') {
      allProjects = [...portfolioData.professional, ...portfolioData.personal]
    } else if (activeSection === 'professional') {
      allProjects = portfolioData.professional
    } else {
      allProjects = portfolioData.personal
    }

    if (selectedTechnologies.length === 0) {
      return allProjects
    }

    // OR filter: show projects that have at least one of the selected technologies
    return allProjects.filter((project) =>
      selectedTechnologies.some((tech) => project.technologies.includes(tech))
    )
  }, [portfolioData, selectedTechnologies, activeSection])

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    )
  }

  const formatPeriod = (start: string, end: string) => {
    const formatDate = (dateStr: string) => {
      if (dateStr === 'ongoing') return dict.portfolio.ongoing
      const [year, month] = dateStr.split('-')
      return `${month}/${year}`
    }
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  // Calculate how many technologies to show in the first row
  // Estimate based on typical button width and container width
  const technologiesPerRow =
    typeof window !== 'undefined' && window.innerWidth < 640 ? 4 : 8 // 640px = 40rem, mobile vs desktop
  const visibleTechnologies = showAllTechnologies
    ? allTechnologies
    : allTechnologies.slice(0, technologiesPerRow)

  return (
    <div className="space-y-8">
      {/* Section Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        {[
          { key: 'all' as const, label: dict.portfolio.allProjects },
          { key: 'professional' as const, label: dict.portfolio.professional },
          { key: 'personal' as const, label: dict.portfolio.personal },
        ].map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`rounded-lg border px-2 py-1 text-sm transition-all duration-200 ${
              activeSection === section.key
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-black hover:border-gray-500'
            }`}
          >
            {section.label}
          </button>
        ))}
      </motion.div>

      {/* Technology Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">{dict.portfolio.technologies}</h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {visibleTechnologies.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => toggleTechnology(tech)}
                className={`rounded-full border px-3 py-1 text-sm transition-all duration-200 ${
                  selectedTechnologies.includes(tech)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less Button */}
        {allTechnologies.length > technologiesPerRow && (
          <motion.button
            onClick={() => setShowAllTechnologies(!showAllTechnologies)}
            className="text-sm font-medium text-gray-600 underline hover:text-gray-800"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showAllTechnologies
              ? dict.portfolio.showLessTechnologies
              : `${dict.portfolio.showMoreTechnologies} (${allTechnologies.length - technologiesPerRow})`}
          </motion.button>
        )}

        {selectedTechnologies.length > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedTechnologies([])}
            className="ml-2 text-sm text-gray-500 underline hover:text-gray-700"
          >
            {dict.portfolio.clearFilters}
          </motion.button>
        )}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                layout: { duration: 0.3 },
              }}
              layout
            >
              <Article.Container>
                <div className="space-y-4">
                  {/* Title and Role */}
                  <div>
                    <Article.Title>{project.title[lang]}</Article.Title>
                    <p className="text-sm font-medium text-gray-600">
                      {project.role[lang]}
                    </p>
                  </div>

                  {/* Period */}
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">
                      {dict.portfolio.period}:
                    </span>{' '}
                    {formatPeriod(project.period.start, project.period.end)}
                  </div>

                  {/* Description */}
                  <Article.Paragraph>
                    {project.description[lang]}
                  </Article.Paragraph>

                  {/* Results */}
                  <div>
                    <h4 className="mb-1 text-sm font-semibold">
                      {dict.portfolio.results}:
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-100">
                      {project.results[lang]}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      {dict.portfolio.technologies}:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full border px-2 py-1 text-xs ${
                            selectedTechnologies.includes(tech)
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Article.Container>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-gray-500"
        >
          <p>{dict.portfolio.noProjectsFound}</p>
        </motion.div>
      )}
    </div>
  )
}
