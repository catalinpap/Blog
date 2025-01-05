import { ArticleBannerList, CardGrid } from "@/components";
import { NavigateBackButton } from "@/components/common";
import { ApiResponse, Article, PaginatedApiResponse, Topic } from "@/types";
import { SortControls } from "./components";
import { config } from "@/config";

type Props = {
    params: {
        topic_name: string
    },
    searchParams: {
        sort: string
    }
};

const TopicPage: React.FC<Props> = async ({params, searchParams}) => {
    const { topic_name } = params;
    const { sort } = searchParams;

    const articlesResponse: PaginatedApiResponse = await fetch(`${config.api_base_url}/articles?topic=${topic_name}&sort=${sort}`, {
        method: 'GET'
    }).then(response => response.json());

    const topic: Topic = await fetch(`${config.api_base_url}/topics/${topic_name}`, {
        method: 'GET'
    }).then(response => response.json()).then((response: ApiResponse) => response.data as Topic);
     
    const articles = articlesResponse.data.content as Article[];

    return (
        <main className="page-content">
            <NavigateBackButton />
            <section className="flex justify-center items-center flex-col p-4 h-[33dvh] text-center bg-black text-light-gray">
                <h1 className="text-xl lg:text-4xl font-semibold uppercase tracking-widest">{topic.name}</h1>
                <h2 className="text-lg lg:text-2xl font-thin tracking-wide">{topic.description}</h2>
            </section>
            <section className="w-full bg-light-gray flex flex-col lg:flex-row divide-y lg:divide-x divide-gray mb-2">
                <SortControls />
            </section>
            <h2>Recommended</h2>
            <CardGrid data={articles} />
            <h3>Latest</h3>
            <ArticleBannerList data={articles} />
        </main>
    );
};

export default TopicPage;