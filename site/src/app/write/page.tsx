'use client';

import { extractArticle } from "@/utils/helpers";
import { ArticleForm } from "./components";

const WritePage:React.FC = () => {
    const publishArticle = async (formData: FormData) => {
        console.log("publish article");

        const article = extractArticle(formData);

        console.log(article);

        // const response = await fetch('http://localhost:8080/api/articles', {
        //     method: 'POST',
        //     body: JSON.stringify(articleDTO),
        //     headers: {
        //         'content-type': 'application/json',
        //         'authorization': `basic ${getCookie('authToken')}`
        //     }
        // });
    }

    return (
        <ArticleForm callback={publishArticle}/>
    );
};

export default WritePage;