'use client';

import { useEffect, useState } from "react";
import { TopicTag } from "../common";
import { Topic, PaginatedApiResponse } from "@/types";
import { config } from "@/config";

export const PopularTopics:React.FC<{className?: string}> = ({className}) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response: PaginatedApiResponse = await fetch(`${config.api_base_url}/topics`, {
        method: 'GET'
      }).then(response => response.json());
      
      const topics = response.data.content;
      setTopics(topics as Topic[]);
    }

    fetchTopics();
  }, []);

    return (
      <div className={className}>
        <h3 className="text-base font-medium mb-4">Popular Topics:</h3>
        <div className="flex flex-wrap gap-2">
          {
            topics.map(topic => 
              <TopicTag 
                key={topic.id} 
                href={topic.name}
                className="font-medium p-2">
                  {topic.name}
              </TopicTag>
            )
          }
        </div>
      </div>
    );
  };