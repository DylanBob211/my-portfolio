import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react'

const FancyButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
>(function Btn({ children, ...rest }, ref) {
  return (
    <button
      ref={ref}
      {...rest}
      className="group relative cursor-pointer rounded bg-lime-300 px-4 py-2 font-bold text-gray-700 transition-colors duration-[400ms] hover:text-gray-700"
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-gray-500 transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute top-0 right-0 h-0 w-[2px] bg-gray-500 transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-gray-500 transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-gray-500 transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  )
})

export default FancyButton
