'use client';

import { useContext, useEffect, useState } from "react";
import { ArticleBannerList } from "@/components";
import { UserContext, UserContextType } from "@/context/user-context/user-context";
import { ApiResponse, Article } from "@/types";
import { config } from "@/config";

const BookmarksPage = () => {
    const {user} = useContext(UserContext) as UserContextType;
    const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if(!user) return;
            const bookmarks = await fetch(`${config.api_base_url}/bookmarks?userId=${user.id}`)
                .then(response => response.json())
                .then((response: ApiResponse) => response.data as Article[]);

            setBookmarkedArticles(bookmarks);
        }

        fetchBookmarks();
    }, []);


    return (
        <main className="page-content">
            <h1>My Bookmarks</h1>
            <ArticleBannerList data={bookmarkedArticles}/>
        </main>
    );
};

export default BookmarksPage;