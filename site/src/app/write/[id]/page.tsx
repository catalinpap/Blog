'use client';

import { ApiResponse, Article } from "@/types";
import { ArticleForm } from "../components";
import { useEffect, useState } from "react";
import { extractArticle, getCookie } from "@/utils/helpers";

type Props = {
    params: {
        id: string
    },
    searchParams: {

    }
};

// TODO: add check so that only the author can edit an article
// Current behavior: can navigate to url /write/[id], edit article and post it as a new one

const EditPage: React.FC<Props> = (props) => {
    const {id} = props.params;
    const [article, setArticle] = useState<Article | null>(null);
    
    useEffect(() => {
        const fetchArticle = async () => {
            const response = await fetch(`http://localhost:8080/api/articles/${id}`);
            const responseData: ApiResponse = await response.json();
            const {data, message} = responseData;
            if (!response.ok) alert(responseData.message);
            setArticle(data as Article);
        }

        fetchArticle();
    }, [id]);


    const editArticle = async (formData: FormData) => {
        const articleData: Article = extractArticle(formData);

        const response = await fetch('http://localhost:8080/api/articles', {
            method: 'POST',
            body: JSON.stringify(articleData),
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${getCookie('authToken')}`
            }
        });
    }

    return (
        <div>
            <ArticleForm articleData={article as Article} callback={editArticle}/>
        </div> 
    );
};

export default EditPage;