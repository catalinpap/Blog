'use client';

import { ArticlesContext, ArticlesContextType } from "@/context/articles-context/articles-context";
import { Article } from "@/types";
import { useContext, useEffect } from "react";
import { ArticleBannerList } from "@/components";

export const OwnArticles: React.FC = () => {
    const {articles: ownArticles, setArticles: setOwnArticles} = useContext(ArticlesContext) as ArticlesContextType;

    useEffect(() => {
        const fetchOwnArticles = async () => {
            const fetchedArticles: Article[] = await fetch('http://localhost:8080/api/articles', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(response => response.data.content);

            setOwnArticles(fetchedArticles);
        };

        fetchOwnArticles();

    }, []);
    
    return (
        <>
            <ArticleBannerList data={ownArticles} editable={true} className="divide-y-2 divide-light-gray text-base font-medium"/>
        </>
    );
};