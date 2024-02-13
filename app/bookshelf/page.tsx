import { Metadata } from "next"
import { Book } from "../lib/models"
import { fetchWholeBookshelf } from "../lib/data"
import { Article } from "../ui/article"

export const metadata: Metadata = {
    title: 'On my bookshelf'
}

const BookItem = ({ title, author, thoughts }: Book) => (
    <Article.Container>
        <Article.Title>{title}</Article.Title>
        <Article.Subtitle>{author}</Article.Subtitle>
        <Article.Paragraph>{thoughts}</Article.Paragraph>
    </Article.Container>
)

export default async function Bookshelf() {
    const { rows: books } = await fetchWholeBookshelf()
    return (
        <>
            {books.map((book) => <div key={book.id}><BookItem {...book} /></div>)}
        </>
    )
}