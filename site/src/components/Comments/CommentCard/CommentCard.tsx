import { Comment } from "@/types";
import { HeartEmptyIcon } from "../../icons";
import { format_date } from "@/utils/helpers";

export const CommentCard: React.FC<{data: Comment}> = ({data}) => {
    return (
        <div className="mb-6 border-t border-light-gray py-2">
            <div className="flex flex-row justify-between">
                <div>
                    <p className="text-sm font-medium mb-1">{data.username}</p>
                    <p className="text-xs font-light text-[#6C757D] mb-3">{format_date(data.creationDate)}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                        <HeartEmptyIcon size={18} color={"gray"} /> {data.likes}
                    </span>
                    <button className="text-xs font-medium text-[#6C757D] uppercase">Reply</button>
                </div>
            </div>
            <p className="text-base font-light text-[#6C757D] tracking-wide ml-2">
                {data.content}
            </p>
        </div>
    );
};