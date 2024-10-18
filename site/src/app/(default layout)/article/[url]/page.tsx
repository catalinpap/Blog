'use server';

import { CategoryTag } from "@/components/common";
import { ArticleBannerList, Comments, FloatPanel, PopularTopics } from "@/components";
import { BookmarkIcon, CommentIcon, HeartEmptyIcon, ShareIcon } from "@/components/icons";
import { Article, PaginatedApiResponse } from "@/types";

type Props = {
    params: {
        url: string
    },
    searchParams: {

    }
};

const ArticlePage: React.FC<Props> = async (props) => {
    const {url: article_url} = props.params;

    const article_id = article_url.split('-').pop();

    const article: Article =  await fetch(`http://localhost:8080/api/articles/${article_id}`, {
        method: 'GET',
        
    }).then(response => response.json()).then(content => content.data);

    return (
        <>  
            <main className="page-content flex flex-col lg:flex-row">
                {/* Tools sidepanel */}
                <aside className="absolute h-full top-0 right-full mr-4 block">
                    <div className="sticky top-20 flex-col gap-4 hidden lg:flex">
                        <HeartEmptyIcon size={28} color={"#6C757D"} className="cursor-pointer hover:fill-orange" />
                        <BookmarkIcon size={28} color={"#6C757D"} className="cursor-pointer hover:fill-yellow" />
                        <ShareIcon size={28} color={"#6C757D"} className="cursor-pointer hover:fill-blue" />

                    </div>
                </aside>
                <article className="main-container article-formatted">
                    <CategoryTag>{article.category}</CategoryTag>
                    <h1>{article.title}</h1>
                    
                    <div className="flex flex-row justify-between mb-16">
                        <div className="flex flex-row divide-x divide-black text-xs">
                            <span className="pr-2 italic font-light">written by: 
                                <span className="font-medium non-italic"> {article.author.name}</span>
                            </span>
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
                                <CommentIcon size={18} color={"#6C757D"} /> {article.comments.length}
                            </span>
                        </div>
                    </div>
                    
                    <section className="article-formatted text-[#6C757D] font-light tracking-wide" dangerouslySetInnerHTML={{__html: article.content}}>
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
                    <Comments comments={article.comments} />

                </article>
                <FloatPanel>
                    <PopularTopics className="mb-8"/>

                    <p className="text-base font-medium">More from this author:</p>
                    <ArticleBannerList data={article.author.articles?.slice(0, 5)}/>
                </FloatPanel>
            </main>
        </>
        
    );
};

export async function generateStaticParams() {
    const articles: PaginatedApiResponse = await fetch('http://localhost:8080/api/articles', 
        {method:'GET'}
    ).then((response) => response.json());

    return articles.data.content.map((article: Article) => {
        return {
            url: article.url
        }   
    });
};

export default ArticlePage;