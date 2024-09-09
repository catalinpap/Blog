import { CardGrid, HeroCarousel, SidePanel } from "@/components";
import { CategoryTag } from "@/components/common";
import { Article } from "@/types";

const article: Article = {
  id: 1,
  name: 'Lorem ipsum dolor sit amet',
  content: '<h2>This is a demo title!</h2><p>I hope this will work</p><p>Lorem ipsos dolor sit amet sailaca daimandz in da scai</p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, cubilia enim sollicitudin libero nam ultricies consequat mi non, eu eget phasellus vivamus praesent vulputate fusce. Luctus turpis aptent sodales arcu hac porta torquent libero, conubia potenti vivamus dapibus molestie ut fames porttitor, vel phasellus cum suscipit curabitur morbi ante. Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.</p>',
  category: 'Demo',
  keywords: ['demo', 'test', 'nu stiu'],
  likes: 0,
  bookmarks: 0,
  author: {
    id: 1,
    name: 'Dan Diaconescu'
  }
};

const articlesData: Article[] = Array(10).fill(article);

const fetchArticles = async () => {
  const res = await fetch('http://localhost:8080/api/articles');
  return res.json();
}

export default async function Home() {
  const articles = await fetchArticles();
  console.log(articles.data.content);
  return (
    <main>
      <HeroCarousel />
      <article className="page-content flex flex-col lg:flex-row">
        <section className="main-container">
          <CardGrid data={articlesData} />
        </section>

        <SidePanel>
          {/* Popular Topics */}
          <div className="sticky top-10">
            <h3 className="text-base font-medium mb-4">Popular Topics:</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryTag className="bg-gray">Lifestyle</CategoryTag>
              <CategoryTag>Travel</CategoryTag>
              <CategoryTag>Technology</CategoryTag>
              <CategoryTag>Education</CategoryTag>
              <CategoryTag>Recipe</CategoryTag>
              <CategoryTag>Design</CategoryTag>
            </div>
          </div>
        </SidePanel>

      </article>
      
      
    </main>
  );
}
