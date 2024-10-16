'use client';

import { extractArticle, getCookie } from "@/utils/helpers";
import { ArticleForm } from "./components";

const WritePage:React.FC = () => {
    const publishArticle = async (formData: FormData) => {
        const article = extractArticle(formData);

        const response = await fetch('http://localhost:8080/api/articles', {
            method: 'POST',
            body: JSON.stringify(article),
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${getCookie('authToken')}`
            }
        });
    }

    return (
        <ArticleForm callback={publishArticle}/>
    );
};

export default WritePage;