'use client';

import { ArticlesContext, ArticlesContextType } from "@/context/articles-context/articles-context";
import { Article, PaginatedApiResponse } from "@/types";
import { useContext, useEffect } from "react";
import { ArticleBannerList } from "@/components";
import { UserContext, UserContextType } from "@/context/user-context/user-context";
import { config } from "@/config";

export const OwnArticles: React.FC = () => {
    const { articles: ownArticles, setArticles: setOwnArticles } = useContext(ArticlesContext) as ArticlesContextType;
    const { user } = useContext(UserContext) as UserContextType;

    useEffect(() => {
        const fetchOwnArticles = async () => {
            if (!user) return;
            const fetchedArticles: PaginatedApiResponse = await fetch(`${config.api_base_url}/articles?authorId=${user.id}`, {
                method: 'GET'
            })
            .then(response => response.json());

            setOwnArticles(fetchedArticles.data.content as Article[]);
        };

        fetchOwnArticles();
    }, []);
    
    return (
        <>
            {user
             ? <ArticleBannerList data={ownArticles} editable={true} className="divide-y-2 divide-light-gray text-base font-medium"/>
             : <p>You must be logged in to view</p>}
        </>
    );
};