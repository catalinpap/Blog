'use client';

import { BookmarkFillIcon, BookmarkIcon, HeartEmptyIcon, HeartIcon, ShareIcon } from "@/components/icons";
import { config } from "@/config";
import { UserContext, UserContextType } from "@/context/user-context/user-context";
import { getCookie } from "@/utils/helpers";
import { MouseEvent, useContext, useEffect, useState } from "react";


const postLike = async (articleId: number) => {
    const response = await fetch(`${config.api_base_url}/articles/${articleId}/like`, {
        method: 'POST',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const removeLike = async (articleId: number) => {
    const response = await fetch(`${config.api_base_url}/articles/${articleId}/like`, {
        method: 'DELETE',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const postBookmark = async (articleId: number) => {
    const response = await fetch(`${config.api_base_url}/articles/${articleId}/bookmark`, {
        method: 'POST',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const removeBookmark = async (articleId: number) => {
    const response = await fetch(`${config.api_base_url}/articles/${articleId}/bookmark`, {
        method: 'DELETE',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const share = (event: MouseEvent) => {
    event.preventDefault();

    console.log('share');
}

export const ArticleInteractControls: React.FC<{articleId: number, size?: number}> = ({articleId, size = 28}) => {
    const {user} = useContext(UserContext) as UserContextType;
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const checkAlreadyLiked = async () => {
            await fetch(`${config.api_base_url}/articles/${articleId}/like/check`, {
                method: 'GET',
                headers: {
                    'Authorization': `basic ${getCookie('authToken')}`
                }
            })
            .then(response => response.json())
            .then(isLiked => setLiked(isLiked));
        };

        const checkAlreadyBookmarked = async () => {
            await fetch(`${config.api_base_url}/articles/${articleId}/bookmark/check`, {
                method: 'GET',
                headers: {
                    'Authorization': `basic ${getCookie('authToken')}`
                }
            })
            .then(response => response.json())
            .then(isBookmarked => setBookmarked(isBookmarked));
        }
       
        // TODO: Create a unified endpoint for user interactions (e.g. {liked: false, bookmarked: false})
        checkAlreadyLiked();
        checkAlreadyBookmarked();
    }, []);

    const handleLike = async (event: MouseEvent) => {
        event.preventDefault();

        if (!user) {
            alert("Need to sign in");
            return;
        }
        let ok: boolean = true;

        if (liked) {
            ok = await removeLike(articleId);
        } else {
            ok = await postLike(articleId);
        }
    
        if(!ok) {
            alert('There was an error');
            return;
        }

        setLiked(!liked);
    };

    const handleBookmark = async (event: MouseEvent) => {
        event.preventDefault();

        if (!user) {
            alert("need to sign in");
            return;
        }
        let ok: boolean = true;

        if (bookmarked) {
            ok = await removeBookmark(articleId);
        } else {
            ok = await postBookmark(articleId)
        }

        setBookmarked(!bookmarked);
    };

    return (
        <>
            <button className="cursor-pointer" onClick={(event) => handleLike(event)}>
                {
                    liked
                    ? <HeartIcon size={size} color={"#6C757D"} className="fill-orange"/>
                    : <HeartEmptyIcon size={size} color={"#6C757D"} className={`${liked && 'fill-orange'} hover:fill-orange`} />
                }
            </button>
            <button className="cursor-pointer" onClick={(event) => handleBookmark(event)}>
                {
                    bookmarked
                    ? <BookmarkFillIcon size={size} color={"#6C757D"} className="fill-yellow"/>
                    : <BookmarkIcon size={size} color={"#6C757D"} className="hover:fill-yellow" />
                }
            </button>
            <button className="" onClick={(event) => share(event)}>
                <ShareIcon size={size} color={"#6C757D"} className="cursor-pointer hover:fill-blue" />
            </button>
        </>
    );
};