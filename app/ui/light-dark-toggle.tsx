'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

const LightDarkToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      className="cursor-pointer text-gray-700 transition duration-300 hover:scale-105 hover:text-gray-500 active:scale-95 dark:text-white dark:hover:text-gray-100"
      onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
    </button>
  )
}

export default LightDarkToggle
