import Image from "next/image";
import { CategoryTag } from "@/components/common";
import { CommentCard, FloatPanel } from "@/components";
import { BookmarkIcon, CommentIcon, HeartEmptyIcon, ShareIcon } from "@/components/icons";
import { ApiResponse, Article } from "@/types";


type Props = {
    params: {
        url: string
    },
    searchParams: {

    }
}

const ArticlePage: React.FC<Props> = async (props) => {
    const {url: article_url} = props.params;

    const article_id = article_url.split('-').pop();

    const article_response: ApiResponse = await fetch(`http://localhost:8080/api/articles/${article_id}`, {
        method: 'GET',
        
    }).then(data => data.json());
    const {data: article} = article_response;

    return (
        <>
            {/* TODO: Extract Hero image to a separate component to avoid duplication. Also make it to be easy to integrate into HeroCarousel */}
            <div className="relative w-full h-[75dvh]">
                <Image src={"https://images.unsplash.com/photo-1524061662617-6a29d732e3ef?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt=""
                    width={800}
                    height={600}
                    className="hero-bg"
                />
            </div>
            <main className="page-content flex flex-col lg:flex-row">
                {/* Tools sidepanel */}
                <aside className="absolute h-full top-0 right-full mr-10 block">
                    <div className="sticky top-20 flex-col gap-4 hidden lg:flex">
                        <HeartEmptyIcon size={28} color={"#6C757D"} className="cursor-pointer hover:fill-orange" />
                        <BookmarkIcon size={28} color={"#6C757D"} className="cursor-pointer hover:fill-yellow" />
                        <ShareIcon size={28} color={"#6C757D"} className="cursor-pointer hover:fill-blue" />

                    </div>
                </aside>
                <article className="main-container">
                    <CategoryTag>{article.category}</CategoryTag>
                    <h1 className="text-[2rem] leading-normal tracking-wide mb-4">{article.title}</h1>
                    <div className="flex flex-row justify-between mb-16">
                        <div className="flex flex-row divide-x divide-black text-xs">
                            <span className="pr-2 font-medium">{article.author.name}</span>
                            <span className="pl-2 text-[#6C757D] font-light">{article.creationDate}</span>
                        </div>
                        <div className="flex flex-row gap-x-3">
                            <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                <HeartEmptyIcon size={18} color={"#6C757D"} /> {article.likes}
                            </span>
                            <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                <BookmarkIcon size={18} color={"#6C757D"} /> {article.bookmarks}
                            </span>
                            <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                <CommentIcon size={18} color={"#6C757D"} /> 2
                            </span>
                        </div>
                    </div>
                    
                    <section className="text-[#6C757D] font-light tracking-wide" dangerouslySetInnerHTML={{__html: article.content}}>
                    </section>

                    {/* Separator */}
                    <span className="block border border-[#CED4DA] rounded-md  w-full my-5" />

                    {/* Author */}
                    <section>
                        <h2 className="text-lg font-medium mb-3">{article.author.name}</h2>
                        <span className="text-sm font-light text-[#6C757D]">“Fifth Strategy” Book Author, Designer</span>
                    </section>

                    {/* Separator */}
                    <span className="block border border-[#CED4DA] rounded-md  w-full my-5" />

                    {/* Comments */}
                    <section>
                        <h2 className="text-base font-medium mb-3">2 comments</h2>
                        <CommentCard />
                        <CommentCard />
                    </section>
                </article>
                <FloatPanel>
                    <div className="sticky top-10">
                        {/* Popular Topics */}
                        <p className="text-base font-medium mb-4">Popular Topics:</p>
                        <div className="flex flex-wrap gap-2 mb-16">
                        <CategoryTag>Lifestyle</CategoryTag>
                        <CategoryTag>Travel</CategoryTag>
                        <CategoryTag>Technology</CategoryTag>
                        <CategoryTag>Education</CategoryTag>
                        <CategoryTag>Recipe</CategoryTag>
                        <CategoryTag>Design</CategoryTag>
                        </div>

                        {/* Popular Articles */}
                        <p className="text-base font-medium mb-4">Related articles:</p>
                        <div className="cursor-pointer mb-4">
                            <CategoryTag>Interior Design</CategoryTag>
                            <p className="text-base font-light ">Growing a distributed product design team</p>
                        </div>
                        <div className="cursor-pointer mb-4">
                            <CategoryTag>Interior Design</CategoryTag>
                            <p className="text-base font-light ">Growing a distributed product design team</p>
                        </div>
                        <div className="cursor-pointer mb-4">
                            <CategoryTag>Interior Design</CategoryTag>
                            <p className="text-base font-light ">Growing a distributed product design team</p>
                        </div>
                    </div>
                </FloatPanel>
            </main>
        </>
        
    );
};

export async function generateStaticParams() {
    const articles = await fetch('http://localhost:8080/api/articles', 
        {method:'GET'}
    ).then((response) => response.json());

    return articles.data.content.map((article: Article) => {
        return {
            url: article.url
        }   
    });
};

export default ArticlePage;