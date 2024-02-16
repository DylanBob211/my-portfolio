import { Metadata } from "next";
import { MMdashYYYY } from "../helpers/date";
import { fetchAllExperiences } from "../lib/data";
import { Experience } from "../lib/models";
import { Article } from "../ui/article";

export const metadata: Metadata = {
    title: 'Experiences'
}

const ExperienceItem = ({ company, date, description, tasks, url}: Experience) => (
    <Article.Container>
        <Article.Title>{ description }</Article.Title>
        <Article.Subtitle><a target="_blank" href={url}>{ company }</a> { MMdashYYYY(date) }</Article.Subtitle>
        <ul className="list-disc">
            {tasks.map((task) => <li key={task}><Article.Paragraph>{task}</Article.Paragraph></li>)}
        </ul>
    </Article.Container>
) 

export default async function Experiences() {
    const { rows: experiences } = await fetchAllExperiences(); 
    return <>
        {experiences.map((experience) => <div key={experience.id} className="mb-2"><ExperienceItem {...experience}/></div>)}
    </>
}