import Image from "next/image";
import "./Card.css";
import Link from "next/link";
import { TopicTag } from "..";
import { Article } from "@/types";
import { format_date, limit_string } from "@/utils/helpers";
import { config } from "@/config";

export const Card: React.FC<{data: Article}> = ({data}) => {
    return (
        <div className="relative">
            <TopicTag href={data.category} className="absolute top-3 right-3 z-10">{data.category}</TopicTag>
            <Link href={`/article/${data.url}`} className="card-wrapper">
                <Image src={data.thumbnail || config.defaultThumbnail} 
                    alt={""}
                    width={960}
                    height={600}
                    className="card-thumbnail"
                />
                <div className="flex flex-col justify-between h-full px-5 pt-4 pb-3">
                    <h2 className="card-title">{limit_string(data.title, 35)}</h2>
                    {/* <p className="card-description">{data.content?.substring(0,50) + '...'}</p> */}
                    <p className="card-info">by <span className="font-semibold">{data.author?.name}</span>, {format_date(data.creationDate)}</p>
                </div>
                
            </Link>
        </div>
    );
};
