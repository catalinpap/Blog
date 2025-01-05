'use client';

import { FormEvent, useEffect, useState } from "react";
import { getCookie } from "@/utils/helpers";
import { Comment } from "@/types";
import { config } from "@/config";

export const WriteComment:React.FC<{
    articleId: number, 
    onSubmit?: (newComment: Comment) => void}> = ({articleId, onSubmit}) => {
    const [isAuth, setIsAuth] = useState(false);

    const getUser = async () => {
        const user = await fetch(`${config.api_base_url}/me`, {
            method: 'POST',
            headers: {
                'authorization': `basic ${getCookie('authToken')}`
            }
        }).then(response => response.json());

        return user;
    };

    const postComment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { username } = await getUser();
        const content = formData.get('content');

        if(!username || !content) return;

        const commentData = {
            content: content,
            username: username,
            articleId: articleId
        };

        const response = await fetch(`${config.api_base_url}/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${getCookie('authToken')}`
            },
            body: JSON.stringify(commentData)
        });

        if(response.ok) {
            const newComment = await response.json();
            onSubmit?.(newComment);
        } else {
            alert('Something went wrong! Try again later.');
        }
    };

    useEffect(() => {
        const isAuthCookie = getCookie('authenticated') === 'true';
        setIsAuth(isAuthCookie);
    }, []);

    const commentPlaceholder = isAuth ? "Write a comment..." : "You Must Be Logged In To Leave A Comment!";

    return (
        <form id="comment-form" className="text-right" onSubmit={postComment}>
            <textarea 
                name="content" 
                placeholder={commentPlaceholder} 
                className="w-full h-[240px] p-2 resize-none overflow-x-hidden overflow-y-auto"
                disabled={!isAuth} 
                required
            />
            <button 
                type="submit" 
                className="button-primary mt-2 right-0" 
                disabled={!isAuth}>
                    Post Comment
            </button>
        </form>  
    );
};