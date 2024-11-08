"use client";

import { ArticleBannerList } from "@/components";
import { Article } from "@/types";
import { useEffect, useState } from "react";

const OwnArticles: React.FC<{}> = () => {
    const [ownArticles, setOwnArticles] = useState<Article[]>([]);

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
        <main className="page-content">
            <h1 className="text-2xl font-extralight mb-4">My Articles</h1>
            <ArticleBannerList data={ownArticles} editable={true} className="divide-y-2 divide-light-gray text-base font-medium"/>
        </main>
    )
};

export default OwnArticles;