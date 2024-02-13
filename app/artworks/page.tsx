import { Metadata } from "next"
import { Artwork } from "../lib/models"
import { fetchAllArtworks } from "../lib/data"
import { Article } from "../ui/article"

export const metadata: Metadata = {
    title: 'Artworks'
}

const ArtworkItem = ({ title, url, description }: Artwork) => (
    <Article.Container>
        <Article.Title><a href={url} target="_blank">{title}</a></Article.Title>
        <Article.Paragraph>{description}</Article.Paragraph>
    </Article.Container>
)

export default async function Artworks() {
    const { rows: artworks } = await fetchAllArtworks();
    return (
        <>
            {artworks.map((artwork) => <div key={artwork.id} className="mb-2"><ArtworkItem {...artwork} /></div>)}
        </>)
}