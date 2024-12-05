'use client';

import { ArticleBannerList, CardGrid } from "@/components";
import { useEffect, useState } from "react";

type Props = {
    params: {
        topic_name: string
    },
    searchParams: {}
}

const TopicPage: React.FC<Props> = ({params}) => {
    const { topic_name } = params;
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticlesByCategory = async () => {
            const topic = await fetch(`http://localhost:8080/api/topics/${topic_name}`, {
                method: 'GET'
            }).then(response => response.json()).then(response => response.data);
            setArticles(topic.articles);
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