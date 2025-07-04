import { useState, useEffect } from 'react';
import type { VisitorLog } from './types';
import { VISITOR_LOGS_KEY } from './constants';
import { getLocationInfo } from './locationService';
import { cleanPageUrl, shouldSkipLogging, removeAllMockData, clearAllLogs } from './logUtils';
import { getUniqueVisitors, getLocationStats, getPageStats, getDateRangeInfo } from './statisticsUtils';

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

  const logVisit = async (pageUrl: string, referrer?: string) => {
    try {
      console.log('=== logVisit開始 ===', pageUrl);
      
      const locationInfo = await getLocationInfo();
      console.log('Location info obtained:', locationInfo);
      
      // 位置情報が取得できない場合はログ記録をスキップ
      if (!locationInfo) {
        console.log('位置情報が取得できないため、ログ記録をスキップします');
        return;
      }
      
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

  const handleRemoveAllMockData = () => {
    removeAllMockData();
    fetchLogs();
  };

  const handleClearAllLogs = () => {
    clearAllLogs();
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    logs,
    isLoading,
    error,
    fetchLogs,
    logVisit,
    removeAllMockData: handleRemoveAllMockData,
    clearAllLogs: handleClearAllLogs,
    getDateRangeInfo: () => getDateRangeInfo(logs),
    getUniqueVisitors: () => getUniqueVisitors(logs),
    getLocationStats: () => getLocationStats(logs),
    getPageStats: () => getPageStats(logs),
    cleanPageUrl
  };
};