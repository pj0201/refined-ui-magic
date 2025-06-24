
import { useState, useEffect } from 'react';

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

const VISITOR_LOGS_KEY = 'visitor_logs';

export const useVisitorLogs = () => {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = () => {
    try {
      setIsLoading(true);
      const storedLogs = localStorage.getItem(VISITOR_LOGS_KEY);
      if (storedLogs) {
        const parsedLogs = JSON.parse(storedLogs);
        // 最新のものから最大100件まで表示
        setLogs(parsedLogs.slice(0, 100));
      } else {
        setLogs([]);
      }
      setError(null);
    } catch (err) {
      setError('ログの読み込みに失敗しました');
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationInfo = async () => {
    try {
      // 複数のIPアドレス取得サービスを試行
      const ipServices = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://ipinfo.io/json'
      ];

      for (const service of ipServices) {
        try {
          const response = await fetch(service);
          if (response.ok) {
            const data = await response.json();
            
            // サービスによってレスポンス形式が異なるため、適切に処理
            if (service.includes('ipify')) {
              return {
                ip: data.ip,
                country: '日本',
                city: '不明'
              };
            } else if (service.includes('ipapi')) {
              return {
                ip: data.ip,
                country: data.country_name || '不明',
                city: data.city || '不明'
              };
            } else if (service.includes('ipinfo')) {
              return {
                ip: data.ip,
                country: data.country === 'JP' ? '日本' : (data.country || '不明'),
                city: data.city || '不明'
              };
            }
          }
        } catch (serviceError) {
          console.log(`Service ${service} failed, trying next...`);
          continue;
        }
      }
      
      // すべてのサービスが失敗した場合のフォールバック
      return {
        ip: 'ローカル',
        country: '日本',
        city: '不明'
      };
    } catch (error) {
      return {
        ip: 'ローカル',
        country: '日本', 
        city: '不明'
      };
    }
  };

  const logVisit = async (pageUrl: string, referrer?: string) => {
    try {
      const locationInfo = await getLocationInfo();
      
      const newLog: VisitorLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ip_address: locationInfo.ip,
        user_agent: navigator.userAgent,
        page_url: pageUrl,
        referrer: referrer || document.referrer || '',
        country: locationInfo.country,
        city: locationInfo.city,
        visited_at: new Date().toISOString()
      };

      const existingLogs = localStorage.getItem(VISITOR_LOGS_KEY);
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      
      // 新しいログを先頭に追加
      logs.unshift(newLog);
      
      // 最大1000件までに制限
      if (logs.length > 1000) {
        logs.splice(1000);
      }
      
      localStorage.setItem(VISITOR_LOGS_KEY, JSON.stringify(logs));
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
