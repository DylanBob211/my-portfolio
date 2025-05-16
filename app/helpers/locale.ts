import { useParams, usePathname } from 'next/navigation'

export const useCurrentLocale = () => {
  const params = useParams()
  const locale = params.lang
  return locale
}
