'use client';

import { useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Link from "next/link";
import "./write-page.css";

const WritePage:React.FC<{}> = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const articleContentRef = useRef<HTMLTextAreaElement>(null);
    const articlePreviewRef = useRef<HTMLDivElement>(null);
    const togglePreviewButtonRef = useRef<HTMLButtonElement>(null);

    const parseMarkdown = () => {
        const titleMarkdown = `# ${titleRef.current?.value}\n`;
        const markdown = titleMarkdown + articleContentRef.current?.value;

        if (!markdown) return;
        const sanitizedMarkdown = DOMPurify.sanitize(markdown, {USE_PROFILES: {html: true}});
        const parsedHTML = marked.parse(sanitizedMarkdown);
        return parsedHTML.toString();
    };

    const previewMarkdown = () => {
        if (!articlePreviewRef.current) return;
        articlePreviewRef.current.innerHTML = parseMarkdown() || '';
    }

    const togglePreview = () => {
        if (articlePreviewRef.current?.classList.contains('hidden')) {
            articlePreviewRef.current?.classList.remove('hidden');
            articleContentRef.current?.classList.add('hidden', 'lg:block');
            togglePreviewButtonRef.current?.classList.add('selected');
        } else {
            articlePreviewRef.current?.classList.add('hidden');
            articleContentRef.current?.classList.remove('hidden', 'lg:block');
            togglePreviewButtonRef.current?.classList.remove('selected');
        }
    };

    const publishArticle = async () => {
        const title: string = titleRef.current!.value || '';
        const content: string | undefined = parseMarkdown();

        const articleDTO = {
            title: title,
            content: content,
        };

        const response = await fetch('http://localhost:8080/api/articles', {
            method: 'POST',
            body: JSON.stringify(articleDTO),
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${window.btoa('user:user')}` //TODO: handle different authorizations -> basic user:user
            }
        });
    }

    return (
        <>
            <header className="flex flex-row justify-between mx-4 lg:mx-auto lg:container py-6">
                <Link href={"/"}>LOGO</Link>
                <button className="bg-green text-white rounded-full px-3 py-1" onClick={publishArticle}>Publish</button>
            </header>
            <main className={"flex flex-col min-h-[100dvh] mb-36 mx-4 lg:mx-auto lg:container"}>
                <input ref={titleRef} id="title" name="title" type="text" placeholder="Title"  onChange={previewMarkdown}/>
                <div className="relative flex gap-x-1 w-full flex-grow">
                    <button 
                        ref={togglePreviewButtonRef}
                        onClick={togglePreview}
                        className="toggle-preview">
                            Preview
                    </button>
                    <textarea ref={articleContentRef} onChange={previewMarkdown} id="article-content" name="article-content" placeholder="Write your ideas..."/>
                    <div ref={articlePreviewRef} className="w-full p-2 border-l-2 border-gray hidden"></div>
                </div>
            </main>
        </>
    );
};

export default WritePage;