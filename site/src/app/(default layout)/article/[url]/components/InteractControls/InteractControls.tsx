'use client';

import { BookmarkFillIcon, BookmarkIcon, HeartEmptyIcon, HeartIcon, ShareIcon } from "@/components/icons";
import { UserContext, UserContextType } from "@/context/user-context/user-context";
import { getCookie } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";


const postLike = async (articleId: number) => {
    const response = await fetch(`http://localhost:8080/api/articles/${articleId}/like`, {
        method: 'POST',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const removeLike = async (articleId: number) => {
    const response = await fetch(`http://localhost:8080/api/articles/${articleId}/like`, {
        method: 'DELETE',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const postBookmark = async (articleId: number) => {
    const response = await fetch(`http://localhost:8080/api/articles/${articleId}/bookmark`, {
        method: 'POST',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const removeBookmark = async (articleId: number) => {
    const response = await fetch(`http://localhost:8080/api/articles/${articleId}/bookmark`, {
        method: 'DELETE',
        headers: {
            'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
        }
    });

    return response.ok;
};

const share = () => {
    console.log('share');
}

export const InteractControls: React.FC<{articleId: number}> = ({articleId}) => {
    const {user} = useContext(UserContext) as UserContextType;
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const checkAlreadyLiked = async () => {
            await fetch(`http://localhost:8080/api/articles/${articleId}/like/check`, {
                method: 'POST',
                headers: {
                    'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
                }
            })
            .then(response => response.json())
            .then(isLiked => setLiked(isLiked));
        };

        const checkAlreadyBookmarked = async () => {
            await fetch(`http://localhost:8080/api/articles/${articleId}/bookmark/check`, {
                method: 'POST',
                headers: {
                    'AUTHORIZATION': `BASIC ${getCookie('authToken')}`
                }
            })
            .then(response => response.json())
            .then(isBookmarked => setBookmarked(isBookmarked));
        }

        checkAlreadyLiked();
        checkAlreadyBookmarked();
    }, []);

    const handleLike = async () => {
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

    const handleBookmark = async () => {
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
            <button className="cursor-pointer" onClick={handleLike}>
                {
                    liked
                    ? <HeartIcon size={28} color={"#6C757D"} className="fill-orange"/>
                    : <HeartEmptyIcon size={28} color={"#6C757D"} className={`${liked && 'fill-orange'} hover:fill-orange`} />
                }
                
            </button>
            <button className="cursor-pointer" onClick={handleBookmark}>
                {
                    bookmarked
                    ? <BookmarkFillIcon size={28} color={"#6C757D"} className="fill-yellow"/>
                    : <BookmarkIcon size={28} color={"#6C757D"} className="hover:fill-yellow" />
                }
            </button>
            <button className="" onClick={share}>
                <ShareIcon size={28} color={"#6C757D"} className="cursor-pointer hover:fill-blue" />
            </button>
        </>
    );
};