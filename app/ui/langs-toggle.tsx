import { useParams, usePathname, useRouter } from 'next/navigation'

const LangsToggle = () => {
  const path = usePathname()
  const router = useRouter()
  const lang = path?.split('/')[1]
  const changeLang = () => {
    const newLang = lang === 'it' ? 'en' : 'it'
    router.replace(path.replace(lang, newLang))
  }
  if (!lang) return null
  return (
    <button
      className="cursor-pointer text-gray-700 transition duration-300 hover:scale-105 hover:text-gray-500 active:scale-95 dark:text-white dark:hover:text-gray-100"
      onClick={changeLang}
    >
      {lang.toUpperCase()}
    </button>
  )
}

export default LangsToggle
