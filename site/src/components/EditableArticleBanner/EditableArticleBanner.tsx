"use client";

import { Article } from "@/types";
import { ArticleBanner } from "../common";
import Link from "next/link";
import { getCookie } from "@/utils/helpers";
import { useContext } from "react";
import { ArticlesContext, ArticlesContextType } from "@/context/articles-context/articles-context";

const deleteArticle = async (articleId: number, articles: Article[], setArticles: (newArticles: Article[]) => void) => {
    const response = await fetch(`http://localhost:8080/api/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'authorization': `basic ${getCookie('authToken')}`
      }
    });
    const responseData = await response.json();

    if(response.ok) removeFromContext(articleId, articles, setArticles);
    else alert(responseData.message);
};

const removeFromContext = (articleId: number, articles: Article[], setArticles: (newArticles: Article[]) => void) => {
  const updatedList = articles.filter(article => article.id !== articleId);
  setArticles(updatedList);
};

export const EditableArticleBanner:React.FC<{data: Article}> = ({data}) => {
    const { articles, setArticles } = useContext(ArticlesContext) as ArticlesContextType;

    return (
      <div className="flex flex-row w-full">
        <ArticleBanner data={data} />
        <div className="flex flex-col border-l border-light-gray">
          <Link href={`/write/${data.id}`} className="w-full h-full px-2 flex justify-center items-center">Edit</Link>
          <button 
            className="w-full h-full px-2" 
            onClick={() => deleteArticle(data.id, articles, setArticles)}>
              Delete
          </button>
        </div>
      </div>
    );
};