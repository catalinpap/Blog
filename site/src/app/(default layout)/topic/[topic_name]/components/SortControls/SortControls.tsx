'use client';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent } from "react";
import "./SortControls.css";

type SortOptionKeys = "recommended" | "most-liked" | "newest" | "oldest";

const SortOptions: Record<SortOptionKeys, string> = {
    "recommended": "Recommended",
     "most-liked": "Most Liked",
     "newest": "Newest",
     "oldest": "Oldest"
};

const isActive = (sortOption: string, searchParams: ReadonlyURLSearchParams): boolean => {
    return sortOption === searchParams.get('sort');
}

export const SortControls: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pushSortParam = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const sortParam: string = event.currentTarget.name;

        const newSearchParams = new URLSearchParams({
            sort: sortParam
        });

        router.replace('?' + newSearchParams.toString(), {scroll: false});
    };

    return (
        <>
            {
                Object.entries(SortOptions).map(([key, label]) => 
                    <button key={key} 
                        name={key} 
                        onClick={(e) => pushSortParam(e)} 
                        className={`sort-label ${isActive(key, searchParams) && 'sort-label-active'}`}>
                            {label}
                    </button>
                )
            }
        </>
    );
};