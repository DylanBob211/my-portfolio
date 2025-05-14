import { PropsWithChildren } from 'react'

export namespace Article {
  export function Container({ children }: PropsWithChildren) {
    return <article className="mb-4">{children}</article>
  }

  export function Title({ children }: PropsWithChildren) {
    return <h3 className="b-2 text-xl font-semibold">{children}</h3>
  }

  export function Subtitle({ children }: PropsWithChildren) {
    return <h4 className="text-xl font-bold">{children}</h4>
  }

  export function HintText({ children }: PropsWithChildren) {
    return <p className="mb-0 text-xs">{children}</p>
  }

  export function Paragraph({ children }: PropsWithChildren) {
    return (
      <p className="mb-2 border-l-1 border-gray-200 pt-1 pl-3 text-balance">
        {children}
      </p>
    )
  }
}
