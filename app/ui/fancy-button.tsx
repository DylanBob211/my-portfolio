import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react'

const FancyButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
>(function Btn({ children, ...rest }, ref) {
  return (
    <button
      ref={ref}
      {...rest}
      className="group relative cursor-pointer rounded bg-lime-300 px-4 py-2 font-bold text-gray-700 transition duration-[200ms] hover:scale-102 hover:text-gray-700 active:scale-99 dark:text-gray-950"
    >
      <span>{children}</span>
    </button>
  )
})

export default FancyButton
