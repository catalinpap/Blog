import Image from "next/image";
import "./Card.css";
import Link from "next/link";
import { CategoryTag } from "..";
import { Article } from "@/types";

const Card: React.FC<{data: Article}> = ({data}) => {

    const format_date = (date: string): string => {
        return new Date(date).toLocaleDateString('en-us', {day:'numeric', month: 'short', year: 'numeric'});
    }

    return (
        <Link href={'/article'} className="card-wrapper">
            <CategoryTag className="absolute top-3 right-3 z-10">{data.category}</CategoryTag>
            <Image src={"https://images.unsplash.com/photo-1524061662617-6a29d732e3ef?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                alt={""} 
                width={960} 
                height={600}
                className="card-thumbnail"
            />
            <div className="flex flex-col justify-between px-5 pt-4 pb-3">
                <h2 className="card-title">{data.title.substring(0,25) + '...'}</h2>
                <p className="card-description">{data.content.substring(0,50) + '...'}</p>
                <p className="card-info">by <span className="font-semibold">{data.author.name}</span>, {format_date(data.creationDate)}</p>
            </div>
            
        </Link>
    );
};

export default Card;
