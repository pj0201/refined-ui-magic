
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
const LAST_LOG_TIME_KEY = 'last_log_time';

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

  // 短時間での重複ログをチェックする関数
  const shouldSkipLogging = (ipAddress: string) => {
    const lastLogTime = localStorage.getItem(LAST_LOG_TIME_KEY);
    if (!lastLogTime) return false;

    const now = Date.now();
    const timeDiff = now - parseInt(lastLogTime);
    
    // 30秒以内の重複ログをスキップ
    if (timeDiff < 30000) {
      console.log('重複ログをスキップしました（30秒以内）');
      return true;
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
      
      // 重複ログのチェック
      if (shouldSkipLogging('temp')) {
        return;
      }
      
      const locationInfo = await getLocationInfo();
      console.log('Location info obtained:', locationInfo);
      
      // 同じIPからの重複ログをさらにチェック
      if (shouldSkipLogging(locationInfo.ip)) {
        return;
      }
      
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
      // 最後のログ時間を記録
      localStorage.setItem(LAST_LOG_TIME_KEY, Date.now().toString());
      
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
    getLogRetentionInfo
  };
};
