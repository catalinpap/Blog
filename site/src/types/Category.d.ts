import { Article } from "./Article";

export type Category = {
    id: number,
    name: string,
    articles: Article[]
};