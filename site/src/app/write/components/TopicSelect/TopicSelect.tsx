'use client';

import { PaginatedApiResponse, Topic } from "@/types";
import { useEffect, useState } from "react";

export const TopicSelect = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const topicsResponse: PaginatedApiResponse = await fetch('http://localhost:8080/api/topics', {
                method: 'GET'
            })
            .then(response => response.json());
            
            setTopics(topicsResponse.data.content as Topic[]);
        }

        fetchTopics();
    }, []);

    return (
        <select name="topic" className="w-[180px] p-2 text-sm capitalize">
            {
                topics.map(topic => (
                <option key={topic.name} value={topic.id} className="capitalize">{topic.name}</option>
            ))
            }
        </select>
    );
};