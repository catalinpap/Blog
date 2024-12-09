import Image from "next/image";
import { Carousel, TopicTag } from "../common";
import { Article } from "@/types";
import Link from "next/link";

const ArticleCarouselItem:React.FC<{
    thumbnail: string,
    category: string,
    title: string,
    url: string
}> = ({thumbnail, category, title, url}) => {
    return (
        <Link href={`/article/${url}`}>
            <Image src={thumbnail || ''} 
                alt="" 
                width={1600} 
                height={1200}
                className="w-full h-full -z-10 object-cover"
                />
            <div className="absolute w-full bottom-4 p-4">
                {/* Category tag */}
                <TopicTag href={category}>{category}</TopicTag>
                {/* Title */}
                <h1 className="title">{title}</h1>
            </div>
        </Link>
    )
}

export const HeroCarousel: React.FC<{className?: string}> = async ({className}) => {

    const articles: Article[] = await fetch('http://localhost:8080/api/articles?page=0&size=5', {
        method: 'GET'
    }).then(response => response.json()).then(res => res.data.content);

    return (
        <Carousel className={`relative items-end w-fulls ${className}`} transitionStyle="scroll" autoScroll={true}>    
            {articles.map(article => 
                <ArticleCarouselItem 
                    key={`carousel-article-${article.id}`}
                    thumbnail={article.thumbnail}
                    title={article.title}
                    category={article.category}
                    url={article.url}
                />
            )}
        </Carousel>
    );
};