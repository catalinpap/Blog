import { ArticleBannerList } from "@/components";
import { UserIcon } from "@/components/icons";
import { config } from "@/config";
import { ApiResponse, Article, PaginatedApiResponse, User } from "@/types";

type Props = {
    params: {
        username: string
    },
    searchParams: {

    }
};

const UserPage: React.FC<Props> = async (props) => {
    const {username} = props.params;

    const user: User = await fetch(`${config.api_base_url}/users/@${username}`, {
        method: 'GET'
    }).then(response => response.json()).then((response: ApiResponse) => response.data as User);

    const userArticles: Article[] = await fetch(`${config.api_base_url}/articles?authorId=${user.id}`, {
        method: 'GET'
    }).then(response => response.json()).then((response: PaginatedApiResponse) => response.data.content as Article[]);

    return (
        <main className="page-content">
            <section className="flex justify-center items-center flex-col gap-1 p-4 h-[33dvh] text-center bg-black text-light-gray">
                <span><UserIcon size={36}/></span>
                <h1 className="text-2xl font-bold">{user.displayName}</h1>
                <p className="text-base font-light text-dark-gray">@{user.username}</p>
            </section>
            <ArticleBannerList data={userArticles}/>
        </main>
    );
};

export default UserPage;