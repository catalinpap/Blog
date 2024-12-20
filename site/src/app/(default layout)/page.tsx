import { ArticleBannerList, CardGrid, HeroCarousel, FloatPanel, PopularTopics } from "@/components";
import { Article, PaginatedApiResponse } from "@/types";

const fetchArticles = async () => {
  const res = await fetch('http://localhost:8080/api/articles', {
    method: 'GET'
  });
  return res.json();
}

export default async function Home() {
  const fetchArticlesResponse: PaginatedApiResponse = await fetchArticles();
  const articles: Article[] = fetchArticlesResponse.data.content as Article[];
  return (
    <main>
      <article className="page-content flex flex-col">
        <section className="main-container">
          <HeroCarousel className="mb-4 aspect-[4/3]"/>
          <CardGrid data={articles} />
        </section>

        <section>
            <PopularTopics className="mb-8"/>

            {/* Popular Articles */}
            <p className="text-base font-medium">Popular articles:</p>
            <ArticleBannerList data={articles?.slice(0,6)} className="text-sm font-medium" />
        </section>

      </article>
      
      
    </main>
  );
};
