import { Article } from "./Article";

export type Topic = {
    id: number,
    name: string,
    description: string,
    articles: Article[]
};