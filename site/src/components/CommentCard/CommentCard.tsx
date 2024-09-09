import { HeartEmptyIcon } from "../icons";

const CommentCard: React.FC<{}> = () => {
    return (
        <div className="mb-8">
            <div className="flex flex-row justify-between">
                <div>
                    <p className="text-base font-medium mb-1">Jason</p>
                    <p className="text-xs font-light text-[#6C757D] mb-3">8 Sep. 2023</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                        <HeartEmptyIcon size={18} color={"gray"} /> 10
                    </span>
                    <button className="text-xs font-medium text-[#6C757D] uppercase">Reply</button>
                </div>
            </div>
            <p className="text-sm font-light text-[#6C757D] tracking-wide mb-0">
                Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, 
                mollis fames scelerisque to an aliquam ac non est penatibus hac, 
                sapien elementum tincidunt nunc magna varius leo.
            </p>
        </div>
    );
};
export default CommentCard;