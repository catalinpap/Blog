import Image from "next/image";
import "./Card.css";
import Link from "next/link";
import { TopicTag } from "..";
import { Article } from "@/types";
import { format_date, limit_string } from "@/utils/helpers";

export const Card: React.FC<{data: Article}> = ({data}) => {
    return (
        <div className="relative">
            <TopicTag href={data.category} className="absolute top-3 right-3 z-10">{data.category}</TopicTag>
            <Link href={`/article/${data.url}`} className="card-wrapper">
                <Image src={data.thumbnail || "https://images.unsplash.com/photo-1524061662617-6a29d732e3ef?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
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
