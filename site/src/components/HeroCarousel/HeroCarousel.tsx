import Image from "next/image";
import { Carousel, CategoryTag } from "../common";
import { Article } from "@/types";

const ArticleCarouselItem:React.FC<{
    thumbnail: string,
    category: string,
    title: string
}> = ({thumbnail, category, title}) => {
    return (
        <>
            <Image src={thumbnail || ''} 
                alt="" 
                width={1600} 
                height={1200}
                className="background"
                />
            <div className="absolute w-full bottom-4 p-4">
                {/* Category tag */}
                <CategoryTag>{category}</CategoryTag>
                {/* Title */}
                <h1 className="title">{title}</h1>
            </div>
        </>
    )
}

export const HeroCarousel: React.FC<{className?: string}> = async ({className}) => {

    const articles: Article[] = await fetch('http://localhost:8080/api/articles?page=0&size=5', {
        method: 'GET'
    }).then(response => response.json()).then(res => res.data.content);

    return (
        <Carousel className={`relative items-end w-full ${className}`} transitionStyle="scroll">    
            {articles.map(article => 
                <ArticleCarouselItem 
                    key={`carousel-article-${article.id}`}
                    thumbnail={article.thumbnail}
                    title={article.title}
                    category={article.category}
                />
            )}
        </Carousel>
    );
};