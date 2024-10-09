import { Article } from "./"

export type Author = {
    id: number,
    username: string,
    name: string,
    articles: Article[]
}