import { useParams, usePathname, useRouter } from 'next/navigation'

const LangsToggle = () => {
  const path = usePathname()
  const router = useRouter()
  const lang = path?.split('/')[1]
  const otherLang = lang === 'it' ? 'en' : 'it'
  const changeLang = () => router.replace(path.replace(lang, otherLang))
  if (!lang) return null
  return (
    <button
      className="cursor-pointer text-gray-700 transition duration-300 hover:scale-105 hover:text-gray-500 active:scale-95 dark:text-white dark:hover:text-gray-100"
      onClick={changeLang}
    >
      {otherLang.toUpperCase()}
    </button>
  )
}

export default LangsToggle
