import type { VisitorLog } from './types';
import { VISITOR_LOGS_KEY } from './constants';

// URLをクリーンアップする関数
export const cleanPageUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // クエリパラメータを除去
    return urlObj.origin + urlObj.pathname;
  } catch {
    // URLの解析に失敗した場合はそのまま返す
    return url;
  }
};

// 疑わしいIPアドレスかどうかをチェック
export const isIpSuspicious = (ip: string): boolean => {
  // プライベートIPアドレス
  if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return true;
  }
  
  // 明らかにモックっぽいIP
  const mockIPs = [
    '123.223.213.177',
    '123.456.789.123', 
    '111.111.111.111',
    '222.222.222.222'
  ];
  
  if (mockIPs.includes(ip)) {
    return true;
  }
  
  // 日本語のプレフィックスがあるIP
  if (ip.includes('ローカル') || ip.includes('フォールバック') || ip.includes('テスト')) {
    return true;
  }
  
  return false;
};

// 重複ログチェック（同じページへの1分以内のアクセスのみスキップ）
export const shouldSkipLogging = (newLog: Omit<VisitorLog, 'id'>): boolean => {
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

// 全てのログを削除する関数
export const clearAllLogs = (): void => {
  localStorage.removeItem(VISITOR_LOGS_KEY);
  console.log('全てのログを削除しました');
};

// より厳格なモックデータ削除関数
export const removeAllMockData = (): void => {
  const existingLogs = localStorage.getItem(VISITOR_LOGS_KEY);
  if (!existingLogs) return;
  
  try {
    const logs = JSON.parse(existingLogs);
    console.log('=== モックデータ削除開始 ===');
    console.log('処理前のログ数:', logs.length);
    
    // 実際のログのみを残す（非常に厳格な基準）
    const realLogs = logs.filter((log: VisitorLog) => {
      // テスト関連のIDを削除
      if (log.id.startsWith('test-') || log.id.startsWith('mock-') || log.id.startsWith('demo-')) {
        console.log('テストログを削除:', log.id);
        return false;
      }
      
      // プライベートIPアドレスを全て削除
      if (log.ip_address.startsWith('192.168.') || 
          log.ip_address.startsWith('10.') || 
          log.ip_address.startsWith('172.')) {
        console.log('プライベートIPを削除:', log.ip_address);
        return false;
      }
      
      // 明らかにモックっぽいIPを削除
      const mockIPs = [
        '123.223.213.177',
        '123.456.789.123',
        '111.111.111.111',
        '222.222.222.222'
      ];
      
      if (mockIPs.includes(log.ip_address)) {
        console.log('モックIPを削除:', log.ip_address);
        return false;
      }
      
      // 日本語のプレフィックスがあるIPを削除
      if (log.ip_address.includes('ローカル') || 
          log.ip_address.includes('フォールバック') ||
          log.ip_address.includes('テスト')) {
        console.log('日本語プレフィックスIPを削除:', log.ip_address);
        return false;
      }
      
      // 短時間に全国からアクセスが来ている場合は怪しいので、
      // 1日以内に10件以上の異なる都道府県からのアクセスがある場合は全て削除
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      const recentLogs = logs.filter((l: VisitorLog) => new Date(l.visited_at).getTime() > oneDayAgo);
      const uniqueCountries = new Set(recentLogs.map((l: VisitorLog) => l.country));
      
      if (uniqueCountries.size > 10) {
        console.log('短時間での多地域アクセスを検出、全てをモックと判定');
        return false;
      }
      
      // 2025年7月4日以前のデータは削除（今日より前のテストデータ）
      const logDate = new Date(log.visited_at);
      if (logDate < new Date('2025-07-04')) {
        console.log('古いテストデータを削除:', log.visited_at);
        return false;
      }
      
      return true;
    });
    
    localStorage.setItem(VISITOR_LOGS_KEY, JSON.stringify(realLogs));
    console.log(`モックデータ削除完了: ${logs.length}件 → ${realLogs.length}件`);
    console.log('=== モックデータ削除完了 ===');
  } catch (error) {
    console.error('モックデータ削除中にエラー:', error);
  }
};