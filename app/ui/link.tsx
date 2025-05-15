'use client'
import { usePathname, useParams } from 'next/navigation'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

export default function Link({
  path,
  children,
}: PropsWithChildren<{ path: string }>) {
  const currentPath = usePathname()
  const params = useParams()
  const locale = params?.lang || 'it'

  const localizedPath = `/${locale}${path}`

  return (
    <>
      <NextLink href={localizedPath}>
        <span
          className={
            currentPath === localizedPath ? 'font-normal' : 'font-bold'
          }
        >
          {children}
        </span>
      </NextLink>
    </>
  )
}
