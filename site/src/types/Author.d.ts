import { Article } from "./"

export type Author = {
    id: number,
    username: string,
    name: string,
    bio: string,
    articles: Article[]
}