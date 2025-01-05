'use client';

import { ArticleBannerList } from "@/components";
import { config } from "@/config";
import { Article } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<Article[]>([]);
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    useEffect(() => {
        // TODO: check the bug on stale data on useEffects and page refresh
        const fetchSearchResults = () => {
            fetch(`${config.api_base_url}/search?query=${query}`)
            .then(response => response.json())
            .then((articles: Article[]) => setSearchResults(articles));
        };

        fetchSearchResults();
    }, []);

    return (
        <main className="page-content">
            <h1>Search results for: "{query}"</h1>
            <ArticleBannerList data={searchResults}/>
        </main>
    );
};

export default SearchPage;