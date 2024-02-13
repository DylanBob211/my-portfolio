import { Metadata } from "next"
import { fetchAllProjects } from "../lib/data"
import { Project } from "../lib/models";
import { Badge } from "../ui/badge";
import { MMdashYYYY } from "../helpers/date";

export const metadata: Metadata = {
    title: 'Projects'
}

const ProjectItem = ({ title, description, stack, date }: Project) => (
    <article>
        <h3 className="text-2xl mb-2">{title} <br /><small className="text-xs">{MMdashYYYY(date)}</small></h3>
        <p className="mb-2">{description}</p>
        <div className="flex gap-1">
            {stack.map((item) => <Badge key={item}>{item}</Badge>)}
        </div>
    </article>)

export default async function Projects() {
    const { rows: projects } = await fetchAllProjects();
    return (
        <>
            {projects.map((project) => <ProjectItem key={project.id} {...project} />)}
        </>

    )
}