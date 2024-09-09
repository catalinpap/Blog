export type Article = {
    id: number,
    name: string,
    content: string,
    category: string,
    keywords: string[],
    likes: number,
    bookmarks: number,
    author: {
      id: number,
      name: string
    }
  };