'use client';

import { FormEvent } from "react";
import { SearchIcon } from "../icons";
import { useRouter } from "next/navigation";

const QUERY_FIELD_NAME = "search-query";

export const Search: React.FC = () => {
    const router = useRouter();

    const performSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchFormData = new FormData(event.currentTarget);
        const query = searchFormData.get(QUERY_FIELD_NAME) as String;
        router.push(`/search?query=${query}`);
    }

    return (
        <form className="flex items-center" onSubmit={performSearch}>
            <input name={QUERY_FIELD_NAME} type="text" className="w-full bg-transparent border-b border-gray outline-none p-1.5 text-gray" />
            <button>
                <SearchIcon size={28} />
            </button>   
        </form>
    );
};