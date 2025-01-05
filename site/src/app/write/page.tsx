'use client';

import { extractArticle, getCookie } from "@/utils/helpers";
import { ArticleForm } from "./components";
import { config } from "@/config";

const WritePage:React.FC = () => {
    const publishArticle = async (formData: FormData) => {
        const article = extractArticle(formData);

        const response = await fetch(`${config.api_base_url}/articles`, {
            method: 'POST',
            body: JSON.stringify(article),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `basic ${getCookie('authToken')}`
            }
        });

        if (response.ok) {
            alert('article published');
        }
    }

    return (
        <ArticleForm callback={publishArticle}/>
    );
};

export default WritePage;