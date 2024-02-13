import { PropsWithChildren } from "react";
import { MMdashYYYY } from "../helpers/date";



export namespace Article {
    export function Container({ children }: PropsWithChildren) {
        return <article className="mb-2">{children}</article>
    }
    
    export function Title({ children }: PropsWithChildren) {
        return <h3 className="text-2xl mb-2">{children}</h3>
    }
    
    export function Subtitle({ children}: PropsWithChildren) {
        return <h4 className=""></h4>
    }
    
    export function HintText({ children }: PropsWithChildren) {
        return <p className="mb-0 text-xs">{children}</p>
    }

    export function Paragraph({ children }: PropsWithChildren) {
        return <p className="mb-2">{children}</p>
    }
}