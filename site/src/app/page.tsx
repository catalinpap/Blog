import { ArticleBannerList, CardGrid, Carousel, FloatPanel, PopularTopics } from "@/components";
import { ApiResponse, Article } from "@/types";

const fetchArticles = async () => {
  const res = await fetch('http://localhost:8080/api/articles', {
    method: 'GET'
  });
  return res.json();
}

export default async function Home() {
  const fetchArticlesResponse: ApiResponse = await fetchArticles();
  const articles: Article[] = fetchArticlesResponse.data.content as Article[];
  return (
    <main>
      <article className="page-content flex flex-col lg:flex-row">
        <section className="main-container">
          <Carousel className="mb-4"/>
          <CardGrid data={articles} />
        </section>

        <FloatPanel>
            <PopularTopics />

            {/* Popular Articles */}
            <p className="text-base font-medium mb-4">Popular articles:</p>
            <ArticleBannerList data={articles.slice(1,6)} />
        </FloatPanel>

      </article>
      
      
    </main>
  );
};
