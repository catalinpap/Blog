'use client';

import { createContext, ReactNode, useState } from "react";
import { Article } from "@/types";

export type ArticlesContextType = {
    articles: Article[],
    setArticles: (articles: Article[]) => void
};

export const ArticlesContext = createContext<ArticlesContextType | null>(null);

export const ArticlesProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [articles, setArticles] = useState([] as Article[]);

    return <ArticlesContext.Provider value={{articles, setArticles}}>
        {children}
    </ArticlesContext.Provider>
}