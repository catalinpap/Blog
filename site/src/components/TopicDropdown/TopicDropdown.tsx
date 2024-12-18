'use client';

import { useEffect, useState } from "react";
import { Dropdown } from "../common";
import { ArrowDownIcon } from "../icons";
import { PaginatedApiResponse, Topic } from "@/types";
import Link from "next/link";

export const TopicDropdown: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        const fetchTopics = async() => {
            const topics = await fetch('http://localhost:8080/api/topics', { method: 'GET' })
            .then(response => response.json())
            .then((response: PaginatedApiResponse) => response.data.content as Topic[]);

            setTopics(topics);
        };
        fetchTopics();
    }, []);

    return (
        <>
            {/* TODO: Find out why Dropdown.Wrapper is not allowing parent component to be server-side */}
            <Dropdown.Wrapper>
                <Dropdown.Trigger key="category-dropdown-trigger">
                    <span className="navbar-link items-center gap-x-1 hidden lg:flex">
                        Categories
                        <ArrowDownIcon size={16} />
                    </span>
                </Dropdown.Trigger>
                <Dropdown.Items key="category-dropdown-items" anchor="left" className="w-[280px]">
                    {
                        topics.map(topic => 
                            <Link key={`topic-${topic.id}`} 
                                href={`/topic/${topic.name}`}
                                className="capitalize">
                                    {topic.name}
                            </Link>
                        )
                    }
                </Dropdown.Items>
            </Dropdown.Wrapper>
        </>
        
    );
};