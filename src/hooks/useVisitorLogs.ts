
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitorLog {
  id: string;
  ip_address: string;
  user_agent: string;
  page_url: string;
  referrer: string;
  country: string;
  city: string;
  visited_at: string;
}

export const useVisitorLogs = () => {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('visitor_logs')
        .select('*')
        .order('visited_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setIsLoading(false);
    }
  };

  const logVisit = async (pageUrl: string, referrer?: string) => {
    try {
      await supabase.from('visitor_logs').insert([
        {
          ip_address: '0.0.0.0', // IPアドレスは別途取得が必要
          user_agent: navigator.userAgent,
          page_url: pageUrl,
          referrer: referrer || document.referrer,
          country: 'Japan', // 地理情報は別途APIで取得が必要
          city: 'Unknown'
        }
      ]);
    } catch (error) {
      console.error('Failed to log visit:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    logs,
    isLoading,
    error,
    fetchLogs,
    logVisit
  };
};
