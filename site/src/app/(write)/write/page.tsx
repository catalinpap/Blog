'use client';

import { useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./write-page.css";
import Link from "next/link";

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

        if (!articlePreviewRef.current) return;
        articlePreviewRef.current.innerHTML = parsedHTML.toString();
    };

    const togglePreview = () => {
        if (articlePreviewRef.current?.classList.contains('hidden')) {
            articlePreviewRef.current?.classList.remove('hidden');
            togglePreviewButtonRef.current?.classList.add('selected');
        } else {
            articlePreviewRef.current?.classList.add('hidden');
            togglePreviewButtonRef.current?.classList.remove('selected');
        }
    };

    return (
        <>
            <header className="flex flex-row justify-between w-[1024px] mx-auto py-6">
                <Link href={"/"}>LOGO</Link>
                <button className="bg-green text-white rounded-full px-3 py-1">Publish</button>
            </header>
            <main className={"flex flex-col w-[1024px] mx-auto min-h-[100dvh] mb-36"}>
                <input ref={titleRef} id="title" name="title" type="text" placeholder="Title"  onChange={parseMarkdown}/>
                <div className="relative flex gap-x-1 w-full flex-grow">
                    <button 
                        ref={togglePreviewButtonRef}
                        onClick={togglePreview}
                        className="toggle-preview">
                            Preview
                    </button>
                    <textarea ref={articleContentRef} onChange={parseMarkdown} id="article-content" name="article-content" placeholder="Write your ideas..."/>
                    <div ref={articlePreviewRef} className="w-full p-2 border-l-2 border-gray hidden"></div>
                </div>
            </main>
        </>
    );
};

export default WritePage;