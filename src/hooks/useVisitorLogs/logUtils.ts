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

// モックデータのみを削除する関数
export const removeOnlyMockData = (): void => {
  const existingLogs = localStorage.getItem(VISITOR_LOGS_KEY);
  if (!existingLogs) return;
  
  try {
    const logs = JSON.parse(existingLogs);
    console.log('=== モックデータ削除開始 ===');
    console.log('処理前のログ数:', logs.length);
    
    // モックデータのみを特定して削除
    const realLogs = logs.filter((log: VisitorLog) => {
      // test-logから始まるIDは削除
      if (log.id.startsWith('test-log')) {
        console.log('テストログを削除:', log.id);
        return false;
      }
      
      // 192.168.1.xxxのプライベートIPアドレスを削除
      if (log.ip_address.startsWith('192.168.1.')) {
        console.log('プライベートIPを削除:', log.ip_address);
        return false;
      }
      
      // その他の明らかに異常なIPアドレスを削除
      const mockIPs = [
        '123.223.213.177',
        '10.0.0.50',
        '10.0.0.1'
      ];
      
      if (mockIPs.includes(log.ip_address)) {
        console.log('モックIPを削除:', log.ip_address);
        return false;
      }
      
      // 「ローカル-」で始まるIPアドレスを削除
      if (log.ip_address.startsWith('ローカル-')) {
        console.log('ローカルIPを削除:', log.ip_address);
        return false;
      }
      
      // 「フォールバック-」で始まるIPアドレスを削除
      if (log.ip_address.startsWith('フォールバック-')) {
        console.log('フォールバックIPを削除:', log.ip_address);
        return false;
      }
      
      // 明らかに古すぎるテストデータ（2024年6月以前）を削除
      const logDate = new Date(log.visited_at);
      if (logDate < new Date('2024-06-01')) {
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