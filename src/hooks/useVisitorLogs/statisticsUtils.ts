import type { VisitorLog, DateRangeInfo } from './types';
import { cleanPageUrl } from './logUtils';

// ユニーク訪問者数を計算
export const getUniqueVisitors = (logs: VisitorLog[]): number => {
  console.log('=== getUniqueVisitors開始 ===');
  console.log('現在のログ数:', logs.length);
  const uniqueIPs = new Set(logs.map(log => log.ip_address));
  console.log('ユニークIP一覧:', Array.from(uniqueIPs));
  console.log('ユニーク訪問者数:', uniqueIPs.size);
  console.log('=== getUniqueVisitors完了 ===');
  return uniqueIPs.size;
};

// 地域別統計を取得（改善版）
export const getLocationStats = (logs: VisitorLog[]): [string, number][] => {
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
export const getPageStats = (logs: VisitorLog[]): [string, number][] => {
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

// 日付範囲の情報を取得（改善版）
export const getDateRangeInfo = (logs: VisitorLog[]): DateRangeInfo => {
  if (logs.length === 0) {
    return { oldestDate: null, newestDate: null, totalDays: 0 };
  }
  
  // 日付順にソート
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(a.visited_at).getTime() - new Date(b.visited_at).getTime()
  );
  
  const oldestDate = new Date(sortedLogs[0].visited_at);
  const newestDate = new Date(sortedLogs[sortedLogs.length - 1].visited_at);
  
  // 時間差を計算（ミリ秒）
  const diffTime = Math.abs(newestDate.getTime() - oldestDate.getTime());
  
  // 日数を計算（最低1日とする）
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  
  console.log('=== getDateRangeInfo ===');
  console.log('ログ数:', logs.length);
  console.log('最古日:', oldestDate.toISOString());
  console.log('最新日:', newestDate.toISOString());
  console.log('日数差:', diffDays);
  
  return { oldestDate, newestDate, totalDays: diffDays };
};