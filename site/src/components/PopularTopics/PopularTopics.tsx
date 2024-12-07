'use client';

import { useEffect, useState } from "react";
import { CategoryTag } from "../common";
import { ApiResponse, Category } from "@/types";

export const PopularTopics:React.FC<{className?: string}> = ({className}) => {
  const [topics, setTopics] = useState<Category[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response: ApiResponse = await fetch('http://localhost:8080/api/topics', {
        method: 'GET'
      }).then(response => response.json());
      
      const topics = response.data;
      setTopics(topics as Category[]);
    }

    fetchTopics();
  }, []);

    return (
      <div className={className}>
        <h3 className="text-base font-medium mb-4">Popular Topics:</h3>
        <div className="flex flex-wrap gap-2">
          {
            topics.map(topic => 
              <CategoryTag 
                key={topic.id} 
                href={topic.name} 
                className="font-medium p-2">
                  {topic.name}
              </CategoryTag>
            )
          }
        </div>
      </div>
    );
  };