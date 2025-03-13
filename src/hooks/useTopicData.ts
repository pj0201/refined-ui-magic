
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
        
        // Check if the response content type is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API endpoint returned non-JSON response");
        }
        
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

    // In development, you might want to use the fallback data without making API calls
    // that are expected to fail if the API is not yet implemented
    const isDevelopment = import.meta.env.DEV;
    if (!isDevelopment) {
      fetchTopics();
    } else {
      console.log("Development mode: Using fallback topic data without API call");
      setIsLoading(false);
    }
  }, []);

  return { topics, isLoading, error };
};
