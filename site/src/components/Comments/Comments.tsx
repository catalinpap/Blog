'use client';

import { useCallback, useState } from "react";
import { Comment } from "@/types";
import { WriteComment } from "./WriteComment/WriteComment";
import { CommentIcon } from "../icons";
import { CommentCard } from "./CommentCard/CommentCard";

export const Comments:React.FC<{articleId: number, comments: Comment[]}> = ({articleId, comments}) => {
    const [commentsState, setCommentsState] = useState(comments || []);
    
    const updateComments = useCallback((newComment: Comment) => {
        setCommentsState((prevComments) => [newComment, ...prevComments]);
    }, []);

    return (
        <section className="not-prose">
            <WriteComment articleId={articleId} onSubmit={updateComments}/>
            <h2 className="text-base font-medium mb-3 flex gap-1 items-center">
                <CommentIcon className="mt-1" />
                {commentsState.length} comments
            </h2>
            {commentsState.map(comment => 
                <CommentCard key={comment.id} data={comment} />
            )}
            
        </section>
    );
};