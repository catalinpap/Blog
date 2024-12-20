'use server';

import { TopicTag } from "@/components/common";
import { ArticleBannerList, Comments, PopularTopics } from "@/components";
import { BookmarkIcon, CommentIcon, HeartEmptyIcon, UserIcon } from "@/components/icons";
import { ApiResponse, Article, PaginatedApiResponse } from "@/types";
import { format_date, markdownToHTML } from "@/utils/helpers";
import { ArticleInteractControls } from "@/components/common";

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
    }).then(response => response.json()).then((content: ApiResponse) => content.data as Article);

    const articlesFromThisAuthor: Article[] = await fetch(`http://localhost:8080/api/articles?authorId=${article.authorId}`, {
        method: 'GET'
    }).then(response => response.json()).then((paged: PaginatedApiResponse) => paged.data.content as Article[]);

    return (
        <>  
            <main className="page-content flex flex-col">
                {/* Tools sidepanel */}
                <aside className="absolute h-full top-0 left-0 mr-4 block">
                    <div className="sticky top-24 flex-col gap-4 hidden lg:flex">
                        <ArticleInteractControls articleId={article.id}/>
                    </div>
                </aside>
                <article className="article-formatted font-light tracking-wide mx-auto">
                    <TopicTag href={article.topic}>{article.topic}</TopicTag>
                    <h1 className="text-4xl tracking-widest font-semibold">{article.title}</h1>
                    
                    <div className="flex flex-row justify-between mb-16">
                        <div className="flex flex-row text-xs items-center">
                            <span className="pr-2 italic font-light flex flex-row items-center gap-1">
                                <UserIcon />
                                <span className="font-medium non-italic"> {article.author.name}</span>
                            </span>
                            <span className="divider-bullet"/>
                            <span className="pl-2 text-[#6C757D] font-light">{format_date(article.creationDate)}</span>
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
                    
                    <section 
                        className="" 
                        dangerouslySetInnerHTML={{__html: markdownToHTML(article.content)}}>
                    </section>

                    {/* Separator */}
                    <span className="block border border-[#CED4DA] rounded-md  w-full my-5" />

                    {/* Author */}
                    <section>
                        <div className="flex items-center gap-1">
                            <UserIcon />
                            <h2 className="text-lg font-medium m-0">{article.author.name}</h2>
                        </div>
                        
                        <span className="text-sm font-light text-[#6C757D]">{article.author.about}</span>
                    </section>

                    {/* Separator */}
                    <span className="block border border-[#CED4DA] rounded-md  w-full my-5" />

                    {/* Comments */}
                    <Comments articleId={article.id} comments={article.comments} />

                </article>
                <section>
                    <PopularTopics className="mb-8"/>

                    <p className="text-base font-medium">More from this author:</p>
                    <ArticleBannerList data={articlesFromThisAuthor}/>
                </section>
            </main>
        </>
        
    );
};

export async function generateStaticParams() {
    const response: PaginatedApiResponse = await fetch('http://localhost:8080/api/articles', 
        {method:'GET'}
    ).then((response) => response.json());

    const articles: Article[] = response.data.content as Article[];

    return articles.map((article: Article) => {
        return {
            url: article.url
        }   
    });
};

export default ArticlePage;