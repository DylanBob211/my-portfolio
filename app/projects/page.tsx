import { Metadata } from "next"
import { fetchAllProjects } from "../lib/data"
import { Project } from "../lib/models";

export const metadata: Metadata = {
    title: 'Projects'
}

const ProjectItem = ({ title, description, stack}: Project) => (
    <article>
        <h3 className="text-lg">{title}</h3>
        <p>{description}</p>
        <ul>
            {stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
    </article>)

export default async function Projects() {
    const { rows: projects } = await fetchAllProjects();
    return (
        <>
            {projects.map((project) => <ProjectItem key={project.id} {...project} />)}
        </>

    )
}