'use client';

import { getCookie } from "@/utils/helpers";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export const WriteComment = () => {
    const [isAuth, setIsAuth] = useState(false);

    const getUser = async () => {
        const user = await fetch('http://localhost:8080/api/me', {
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
        console.log(username);
        const content = formData.get('content');

        const comment = {
            content: content,
            username: username,
            articleId: 3
        };

        fetch('http://localhost:8080/api/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${getCookie('authToken')}`
            },
            body: JSON.stringify(comment)
            
        });
    };

    useEffect(() => {
        const isAuthCookie = getCookie('authenticated') === 'true';
        setIsAuth(isAuthCookie);
    }, []);

    return (
        isAuth  
        ? <form id="comment-form" className="text-right" onSubmit={postComment}>
            <textarea name="content" placeholder="Write a comment..." className="w-full h-[240px] p-2 resize-none overflow-y-scroll" />
            <button type="submit" className="button-primary mt-2 right-0">Post Comment</button>
        </form>
        : <div className="py-8 text-gray">
            <p className="capitalize font-extralight">you must be logged in to leave a comment!</p>
            <Link href={'/authenticate'} className="font-light underline">Sign in here</Link>
        </div>   
    );
};