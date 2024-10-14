'use client';

import { Header } from "@/components/common";
import { Article } from "@/types";
import { markdownToHTML } from "@/utils/helpers";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import "./ArticleForm.css";

export type ArticleFormProps = {
    articleData?: Article,
    // callback: (formEvent: FormEvent<HTMLFormElement>) => Promise<void>
    callback: (formData: FormData) => Promise<void>
};

export const ArticleForm:React.FC<ArticleFormProps> = ({articleData, callback}) => {
    const [isPreview, setIsPreview] = useState(false);
    const [article, setArticle] = useState<Article | undefined>(articleData);

    const articlePreviewRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        setArticle(articleData);
    }, [articleData]);

    useEffect(() => {
        if(articlePreviewRef.current && isPreview) {
            articlePreviewRef.current.innerHTML = markdownToHTML(article?.content) as string;
        }
        
    }, [article, isPreview]);

      // Handle changes in the form fields (title, content)
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value, // Update the correct field dynamically (title or content)
        } as Article));
    };

    const submitCallback = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        callback(formData);
    }

    return (
        <form onSubmit={submitCallback}>
            <Header>
                <Link href={"/"}>LOGO</Link>
                <button type="submit" className="button-primary bg-green hover:bg-teal-600">Publish</button>
            </Header>
            <main className={"flex flex-col min-h-[100dvh] mb-36 mx-4 lg:mx-auto lg:container"}>
                <input id="title" name="title" type="text" placeholder="Title" value={article?.title} onChange={handleInputChange}/>
                <div className="relative flex gap-x-1 w-full flex-grow">
                    <button
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                        className={`toggle-preview ${isPreview && 'selected'}`}>
                            Preview
                    </button>
                    <textarea
                        id="article-content" 
                        name="content" 
                        onChange={handleInputChange}
                        value={article?.content}
                        placeholder="Write your ideas..."/>
                    <div ref={articlePreviewRef} className={`article-formatted w-full p-2 border-l-2 border-gray ${!isPreview && 'hidden'}`}></div>
                </div>
            </main>
        </form>
    );
};