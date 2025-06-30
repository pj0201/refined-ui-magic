
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
      console.log('=== fetchLogs開始 ===');
      setIsLoading(true);
      const storedLogs = localStorage.getItem(VISITOR_LOGS_KEY);
      console.log('localStorage から取得した生データ:', storedLogs);
      
      if (storedLogs) {
        const parsedLogs = JSON.parse(storedLogs);
        console.log('パースされたログ数:', parsedLogs.length);
        console.log('パースされたログの最初の3件:', parsedLogs.slice(0, 3));
        
        // 最新のものから最大1000件まで表示
        const finalLogs = parsedLogs.slice(0, 1000);
        console.log('最終的なログ数:', finalLogs.length);
        setLogs(finalLogs);
      } else {
        console.log('localStorageにログが存在しません');
        setLogs([]);
      }
      setError(null);
    } catch (err) {
      console.error('ログの読み込みエラー:', err);
      setError('ログの読み込みに失敗しました');
      setLogs([]);
    } finally {
      setIsLoading(false);
      console.log('=== fetchLogs完了 ===');
    }
  };

  // 重複ログチェック（同じページへの1分以内のアクセスのみスキップ）
  const shouldSkipLogging = (newLog: Omit<VisitorLog, 'id'>) => {
    const existingLogs = localStorage.getItem(VISITOR_LOGS_KEY);
    if (!existingLogs) return false;
    
    try {
      const logs = JSON.parse(existingLogs);
      const oneMinuteAgo = Date.now() - (1 * 60 * 1000); // 1分前
      
      // 同じIPから同じページへの1分以内のアクセスをチェック
      const recentSimilarLog = logs.find((log: VisitorLog) => {
        const logTime = new Date(log.visited_at).getTime();
        return (
          log.ip_address === newLog.ip_address &&
          log.page_url === newLog.page_url &&
          logTime > oneMinuteAgo
        );
      });
      
      if (recentSimilarLog) {
        console.log('重複ログをスキップしました（同じページへの1分以内のアクセス）');
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
      // ipapi.coから位置情報を取得
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
            // 日本の場合は都道府県情報を使用、その他は国名
            let displayCountry = data.country_name || data.country || '不明';
            let displayCity = data.city || data.region || '不明';
            
            // 日本の場合は都道府県を優先
            if (data.country_code === 'JP') {
              displayCountry = data.region || data.city || '日本';
              displayCity = data.city || '不明';
            }
            
            return {
              ip: data.ip,
              country: displayCountry,
              city: displayCity
            };
          }
        }
      } catch (err) {
        console.log('ipapi.co failed:', err);
      }

      // フォールバック：地域を考慮したモックデータ
      console.log('Using fallback mock data');
      const mockIp = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
      const mockPrefectures = ['東京都', '大阪府', '愛知県', '神奈川県', '埼玉県', '千葉県', '兵庫県', '福岡県'];
      const mockCities = ['新宿区', '渋谷区', '中央区', '大阪市', '名古屋市', '横浜市', '神戸市', '福岡市'];
      
      return {
        ip: mockIp,
        country: mockPrefectures[Math.floor(Math.random() * mockPrefectures.length)],
        city: mockCities[Math.floor(Math.random() * mockCities.length)]
      };
      
    } catch (error) {
      console.error('Location info error:', error);
      return {
        ip: `フォールバック-${Date.now()}`,
        country: '東京都',
        city: '新宿区'
      };
    }
  };

  // URLをクリーンアップする関数
  const cleanPageUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      // クエリパラメータを除去
      return urlObj.origin + urlObj.pathname;
    } catch {
      // URLの解析に失敗した場合はそのまま返す
      return url;
    }
  };

  const logVisit = async (pageUrl: string, referrer?: string) => {
    try {
      console.log('=== logVisit開始 ===', pageUrl);
      
      const locationInfo = await getLocationInfo();
      console.log('Location info obtained:', locationInfo);
      
      // URLをクリーンアップ
      const cleanUrl = cleanPageUrl(pageUrl);
      
      const newLogData = {
        ip_address: locationInfo.ip,
        user_agent: navigator.userAgent,
        page_url: cleanUrl,
        referrer: referrer || document.referrer || '',
        country: locationInfo.country,
        city: locationInfo.city,
        visited_at: new Date().toISOString()
      };
      
      // 重複ログのチェック
      if (shouldSkipLogging(newLogData)) {
        console.log('重複ログのためスキップ');
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
      
      console.log('Log saved successfully. Total logs:', logs.length);
      console.log('=== logVisit完了 ===');
      
      // ログを即座に更新
      fetchLogs();
    } catch (error) {
      console.error('Failed to log visit:', error);
    }
  };

  // テスト用のサンプルデータを生成する関数
  const generateTestLogs = () => {
    console.log('=== generateTestLogs開始 ===');
    const testLogs: VisitorLog[] = [];
    const pages = ['/', '/ai-tools', '/ai-glossary', '/faq', '/plans/safety-net'];
    const japanPrefectures = ['東京都', '大阪府', '愛知県', '神奈川県', '埼玉県', '千葉県', '兵庫県', '福岡県', '北海道', '宮城県'];
    const cities = ['新宿区', '渋谷区', '中央区', '大阪市', '名古屋市', '横浜市', '川崎市', '神戸市', '福岡市', '札幌市'];
    const foreignCountries = ['アメリカ', '中国', '韓国', 'イギリス', 'ドイツ'];
    const foreignCities = ['ニューヨーク', '北京', 'ソウル', 'ロンドン', 'ベルリン'];
    const ips = ['192.168.1.100', '10.0.0.50', '172.16.0.25', '203.104.209.102', '8.8.8.8'];

    // 過去30日分のテストデータを生成
    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      
      const visitDate = new Date();
      visitDate.setDate(visitDate.getDate() - daysAgo);
      visitDate.setHours(visitDate.getHours() - hoursAgo);
      visitDate.setMinutes(visitDate.getMinutes() - minutesAgo);

      // 70%の確率で日本、30%の確率で海外
      const isJapan = Math.random() < 0.7;
      let country, city;
      
      if (isJapan) {
        country = japanPrefectures[Math.floor(Math.random() * japanPrefectures.length)];
        city = cities[Math.floor(Math.random() * cities.length)];
      } else {
        country = foreignCountries[Math.floor(Math.random() * foreignCountries.length)];
        city = foreignCities[Math.floor(Math.random() * foreignCities.length)];
      }

      const testLog: VisitorLog = {
        id: `test-log-${Date.now()}-${i}`,
        ip_address: ips[Math.floor(Math.random() * ips.length)],
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        page_url: window.location.origin + pages[Math.floor(Math.random() * pages.length)],
        referrer: Math.random() > 0.5 ? 'https://google.com' : '',
        country: country,
        city: city,
        visited_at: visitDate.toISOString()
      };
      
      testLogs.push(testLog);
    }

    const existingLogs = localStorage.getItem(VISITOR_LOGS_KEY);
    const allLogs = existingLogs ? JSON.parse(existingLogs) : [];
    
    // テストログを追加
    allLogs.unshift(...testLogs);
    
    // 重複を除去（IP+ページ+時刻の組み合わせで）
    const uniqueLogs = allLogs.filter((log: VisitorLog, index: number, arr: VisitorLog[]) => {
      return index === arr.findIndex(l => 
        l.ip_address === log.ip_address && 
        l.page_url === log.page_url && 
        Math.abs(new Date(l.visited_at).getTime() - new Date(log.visited_at).getTime()) < 60000
      );
    });
    
    localStorage.setItem(VISITOR_LOGS_KEY, JSON.stringify(uniqueLogs));
    console.log('テストログ生成完了:', uniqueLogs.length, '件');
    console.log('=== generateTestLogs完了 ===');
    
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // ユニーク訪問者数を計算
  const getUniqueVisitors = () => {
    console.log('=== getUniqueVisitors開始 ===');
    console.log('現在のログ数:', logs.length);
    const uniqueIPs = new Set(logs.map(log => log.ip_address));
    console.log('ユニークIP一覧:', Array.from(uniqueIPs));
    console.log('ユニーク訪問者数:', uniqueIPs.size);
    console.log('=== getUniqueVisitors完了 ===');
    return uniqueIPs.size;
  };

  // 地域別統計を取得（改善版）
  const getLocationStats = () => {
    console.log('=== getLocationStats開始 ===');
    const locationCounts: { [key: string]: number } = {};
    logs.forEach(log => {
      // 地域表示を改善：日本の都道府県はそのまま、海外は国名
      const location = log.country;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });
    
    const result = Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // 上位10地域
    
    console.log('地域別統計:', result);
    console.log('=== getLocationStats完了 ===');
    return result;
  };

  // ページ別統計を取得（改善版）
  const getPageStats = () => {
    console.log('=== getPageStats開始 ===');
    const pageCounts: { [key: string]: number } = {};
    logs.forEach(log => {
      // URLからパスのみを抽出（クエリパラメータを除去）
      const cleanUrl = cleanPageUrl(log.page_url);
      const page = cleanUrl.replace(window.location.origin, '') || '/';
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });
    
    const result = Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // 上位10ページ
    
    console.log('ページ別統計:', result);
    console.log('=== getPageStats完了 ===');
    return result;
  };

  // 日付範囲の情報を取得
  const getDateRangeInfo = () => {
    if (logs.length === 0) {
      return { oldestDate: null, newestDate: null, totalDays: 0 };
    }
    
    const dates = logs.map(log => new Date(log.visited_at).getTime());
    const oldestTime = Math.min(...dates);
    const newestTime = Math.max(...dates);
    
    const oldestDate = new Date(oldestTime);
    const newestDate = new Date(newestTime);
    const diffTime = Math.abs(newestTime - oldestTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return { oldestDate, newestDate, totalDays: diffDays };
  };

  return {
    logs,
    isLoading,
    error,
    fetchLogs,
    logVisit,
    generateTestLogs,
    getDateRangeInfo,
    getUniqueVisitors,
    getLocationStats,
    getPageStats,
    cleanPageUrl
  };
};
