import { useState, useEffect } from "react";
import { Topic, topics as fallbackTopics } from "@/data/topicsData";

export const useTopicData = () => {
  const [topics, setTopics] = useState<Topic[]>(fallbackTopics);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // API URL should be replaced with your actual API endpoint
        const response = await fetch('/api/topics');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch topics: ${response.status}`);
        }
        
        const data = await response.json();
        setTopics(data);
        console.log("Topics fetched successfully:", data);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.log("Using fallback topics data");
        // Keep using the fallback data which is already set as the initial state
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return { topics, isLoading, error };
};
