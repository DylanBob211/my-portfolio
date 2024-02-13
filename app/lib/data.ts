import { sql } from "@vercel/postgres";
import { Artwork, Book, Experience, Project } from "./models";

export async function fetchAllProjects() {
    try {
        return (await sql<Project>`SELECT * from projects ORDER BY date DESC`)
    } catch(e) {
        console.error('Database Error: failed to fetch projects.', e)
        throw new Error('Database Error: failed to fetch projects')
    }
}

export async function fetchAllArtworks() {
    try {
        return (await sql<Artwork>`SELECT * from artworks`)
    } catch(e) {
        console.error('Database Error: failed to fetch artworks.', e)
        throw new Error('Database Error: failed to fetch artworks')
    }
}

export async function fetchAllExperiences() {
    try {
        return (await sql<Experience>`SELECT * from experiences ORDER BY date DESC`)
    } catch(e) {
        console.error('Database Error: failed to fetch experiences.', e)
        throw new Error('Database Error: failed to fetch experiences')
    }
}

export async function fetchAllBookshelf() {
    try {
        return (await sql<Book>`SELECT * from bookshelf`)
    } catch(e) {
        console.error('Database Error: failed to fetch bookshelf.', e)
        throw new Error('Database Error: failed to fetch bookshelf')
    }
}