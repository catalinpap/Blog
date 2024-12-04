import { Author, Category, Comment } from "./";

export type Article = {
    id: number,
    title: string,
    content: string,
    category: Category,
    keywords: string[],
    likes: number,
    bookmarks: number,
    views: number,
    creationDate: string,
    url: string,
    thumbnail: string,
    author: Author,
    authorId: number,
    comments: Comment[]
  };