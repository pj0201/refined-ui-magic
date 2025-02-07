import { useQuery } from "@tanstack/react-query";

const WP_API_URL = "YOUR_WORDPRESS_URL/wp-json/wp/v2";

interface WordPressData {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    [key: string]: any;
  };
}

export const useWordPressData = () => {
  const { data: messageData } = useQuery({
    queryKey: ["message"],
    queryFn: async () => {
      const response = await fetch(`${WP_API_URL}/pages?slug=message`);
      const data: WordPressData[] = await response.json();
      return data[0];
    },
  });

  const { data: supportData } = useQuery({
    queryKey: ["support-areas"],
    queryFn: async () => {
      const response = await fetch(`${WP_API_URL}/pages?slug=support-areas`);
      const data: WordPressData[] = await response.json();
      return data[0];
    },
  });

  const { data: companyData } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const response = await fetch(`${WP_API_URL}/pages?slug=company`);
      const data: WordPressData[] = await response.json();
      return data[0];
    },
  });

  return {
    messageData,
    supportData,
    companyData,
  };
};