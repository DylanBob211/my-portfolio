'use client'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

export default function Link({
  path,
  children,
}: PropsWithChildren<{ path: string }>) {
  const currentPath = usePathname()

  return (
    <>
      <NextLink href={path}>
        <span className={currentPath === path ? 'font-normal' : 'font-bold'}>
          {children}
        </span>
      </NextLink>
    </>
  )
}
