export interface Project {
    id: string,
    title: string,
    description: string,
    stack: string[],
    date: Date
}

export interface Artwork {
    id: string,
    title: string;
    description: string;
    url?: string;
}

export interface Book {
    id: string,
    title: string;
    author: string;
    thoughts: string;
}

export interface Experience {
    id: string,
    company: string,
    description: string,
    tasks: string[],
    date: Date,
    url?: string
}