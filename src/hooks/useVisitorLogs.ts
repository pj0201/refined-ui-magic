
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
        
        // 6月1日以降のログのみフィルタリング
        const june1st = new Date('2024-06-01T00:00:00.000Z');
        const filteredLogs = parsedLogs.filter((log: VisitorLog) => {
          const logDate = new Date(log.visited_at);
          return logDate >= june1st;
        });
        
        // 最新のものから最大1000件まで表示
        setLogs(filteredLogs.slice(0, 1000));
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

  // より適切な重複ログチェック（同じページへの5分以内のアクセスのみスキップ）
  const shouldSkipLogging = (newLog: Omit<VisitorLog, 'id'>) => {
    const existingLogs = localStorage.getItem(VISITOR_LOGS_KEY);
    if (!existingLogs) return false;
    
    try {
      const logs = JSON.parse(existingLogs);
      const fiveMinutesAgo = Date.now() - (5 * 60 * 1000); // 5分前
      
      // 同じIPから同じページへの5分以内のアクセスをチェック
      const recentSimilarLog = logs.find((log: VisitorLog) => {
        const logTime = new Date(log.visited_at).getTime();
        return (
          log.ip_address === newLog.ip_address &&
          log.page_url === newLog.page_url &&
          logTime > fiveMinutesAgo
        );
      });
      
      if (recentSimilarLog) {
        console.log('重複ログをスキップしました（同じページへの5分以内のアクセス）');
        return true;
      }
    } catch (error) {
      console.error('重複チェック中にエラー:', error);
    }
    
    return false;
  };

  const getLocationInfo = async () => {
    console.log('Getting location info...');
    
    try {
      // まずipapi.coを試す（より詳細な位置情報）
      try {
        console.log('Trying ipapi.co...');
        const response = await fetch('https://ipapi.co/json/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('ipapi.co response:', data);
          
          if (data.ip) {
            return {
              ip: data.ip,
              country: data.country_name || data.country || '不明',
              city: data.city || data.region || '不明'
            };
          }
        }
      } catch (err) {
        console.log('ipapi.co failed:', err);
      }

      // 次にipinfo.ioを試す
      try {
        console.log('Trying ipinfo.io...');
        const response = await fetch('https://ipinfo.io/json', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('ipinfo.io response:', data);
          
          if (data.ip) {
            const country = data.country === 'JP' ? '日本' : 
                          data.country === 'US' ? 'アメリカ' :
                          data.country === 'CN' ? '中国' :
                          data.country === 'KR' ? '韓国' :
                          data.country || '不明';
            
            return {
              ip: data.ip,
              country: country,
              city: data.city || data.region || '不明'
            };
          }
        }
      } catch (err) {
        console.log('ipinfo.io failed:', err);
      }

      // 最後にipify.orgでIPアドレスのみ取得
      try {
        console.log('Trying ipify.org...');
        const response = await fetch('https://api.ipify.org?format=json', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('ipify.org response:', data);
          
          if (data.ip) {
            return {
              ip: data.ip,
              country: '不明',
              city: '不明'
            };
          }
        }
      } catch (err) {
        console.log('ipify.org failed:', err);
      }

      // すべて失敗した場合、より詳細なフォールバック情報を提供
      console.log('All services failed, using fallback');
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const language = navigator.language || 'ja-JP';
      
      return {
        ip: `ローカル-${Date.now()}`,
        country: language.includes('ja') ? '日本' : '不明',
        city: connection ? `推定-${connection.effectiveType || '不明'}` : '不明'
      };
      
    } catch (error) {
      console.error('Location info error:', error);
      return {
        ip: `エラー-${Date.now()}`,
        country: '取得失敗',
        city: '取得失敗'
      };
    }
  };

  const logVisit = async (pageUrl: string, referrer?: string) => {
    try {
      console.log('Logging visit for:', pageUrl);
      
      const locationInfo = await getLocationInfo();
      console.log('Location info obtained:', locationInfo);
      
      const newLogData = {
        ip_address: locationInfo.ip,
        user_agent: navigator.userAgent,
        page_url: pageUrl,
        referrer: referrer || document.referrer || '',
        country: locationInfo.country,
        city: locationInfo.city,
        visited_at: new Date().toISOString()
      };
      
      // 重複ログのチェック
      if (shouldSkipLogging(newLogData)) {
        return;
      }
      
      const newLog: VisitorLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...newLogData
      };

      console.log('New log entry:', newLog);

      const existingLogs = localStorage.getItem(VISITOR_LOGS_KEY);
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      
      // 新しいログを先頭に追加
      logs.unshift(newLog);
      
      // 最大1000件までに制限
      if (logs.length > 1000) {
        logs.splice(1000);
      }
      
      localStorage.setItem(VISITOR_LOGS_KEY, JSON.stringify(logs));
      
      console.log('Log saved successfully');
      
      // ログを即座に更新
      fetchLogs();
    } catch (error) {
      console.error('Failed to log visit:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // ユニーク訪問者数を計算
  const getUniqueVisitors = () => {
    const uniqueIPs = new Set(logs.map(log => log.ip_address));
    return uniqueIPs.size;
  };

  // 地域別統計を取得
  const getLocationStats = () => {
    const locationCounts: { [key: string]: number } = {};
    logs.forEach(log => {
      const location = log.country === '日本' ? `${log.country} ${log.city}` : log.country;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });
    
    return Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // 上位10地域
  };

  // ページ別統計を取得
  const getPageStats = () => {
    const pageCounts: { [key: string]: number } = {};
    logs.forEach(log => {
      const page = log.page_url.replace(window.location.origin, '') || '/';
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });
    
    return Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // 上位10ページ
  };

  // ログの保存期間を計算する関数（6月1日基準）
  const getLogRetentionInfo = () => {
    if (logs.length === 0) return { oldestDate: null, totalDays: 0 };
    
    const june1st = new Date('2024-06-01');
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - june1st.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return { oldestDate: june1st, totalDays: diffDays };
  };

  return {
    logs,
    isLoading,
    error,
    fetchLogs,
    logVisit,
    getLogRetentionInfo,
    getUniqueVisitors,
    getLocationStats,
    getPageStats
  };
};
