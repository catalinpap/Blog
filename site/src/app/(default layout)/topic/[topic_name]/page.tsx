'use client';

import { ArticleBannerList, CardGrid } from "@/components";
import { Article, PaginatedApiResponse } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    params: {
        topic_name: string
    },
    searchParams: {}
}

const TopicPage: React.FC<Props> = ({params}) => {
    const { topic_name } = params;
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticlesByCategory = async () => {
            const topic: PaginatedApiResponse = await fetch(`http://localhost:8080/api/articles?category=${topic_name}`, {
                method: 'GET'
            }).then(response => response.json());
            setArticles(topic.data.content as Article[]);
        }

        fetchArticlesByCategory();
    }, [topic_name]);

    return (
        <main className="page-content border">
            <h1 className="text-4xl text-gray font-normal">Explore more from <strong className="uppercase font-medium">{params.topic_name}</strong></h1>
            <h2>Recommended</h2>
            <CardGrid data={articles} />
            <h3>Latest</h3>
            <ArticleBannerList data={articles} />
        </main>
    );
};

export default TopicPage;