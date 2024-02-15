import { Metadata } from "next"
import { fetchAllProjects } from "../lib/data"
import { Project } from "../lib/models";
import { Badge } from "../ui/badge";
import { MMdashYYYY } from "../helpers/date";
import { Article } from '../ui/article';
export const metadata: Metadata = {
    title: 'Projects'
}

const ProjectItem = ({ title, description, stack, date }: Project) => (
    <Article.Container>
        <Article.Title>{title} <br /><Article.HintText>{MMdashYYYY(date)}</Article.HintText></Article.Title>
        <Article.Paragraph>{description}</Article.Paragraph>
        <div className="flex gap-1 flex-wrap">
            {stack.map((item) => <Badge key={item}>{item}</Badge>)}
        </div>
    </Article.Container>
)

export default async function Projects() {
    const { rows: projects } = await fetchAllProjects();
    return (
        <>
            {projects.map((project) => <div key={project.id} className="mb-3"><ProjectItem {...project} /></div>)}
        </>

    )
}