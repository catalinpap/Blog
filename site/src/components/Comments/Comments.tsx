import { CommentCard } from "..";
import { Comment } from "@/types";
import { WriteComment } from "./WriteComment/WriteComment";
import { CommentIcon } from "../icons";

export const Comments:React.FC<{comments: Comment[]}> = ({comments}) => {
    return (
        <section className="not-prose">
            <WriteComment />
            <h2 className="text-base font-medium mb-3 flex gap-1 items-center">
                <CommentIcon className="mt-1" />
                {comments.length} comments
            </h2>
            {comments.map(comment => 
                <CommentCard key={comment.id} data={comment} />
            )}
            
        </section>
    );
};