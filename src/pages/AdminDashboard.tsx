
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { useVisitorLogs } from '@/hooks/useVisitorLogs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Users, Eye, Calendar, Database, MapPin, FileText, TestTube } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { adminUser, logout, isAuthenticated, isLoading } = useAdmin();
  const { 
    logs, 
    isLoading: logsLoading, 
    fetchLogs, 
    logVisit,
    clearAllLogs,
    cleanupTestLogs,
    getDateRangeInfo,
    getUniqueVisitors,
    getLocationStats,
    getPageStats,
    cleanPageUrl
  } = useVisitorLogs();
  const navigate = useNavigate();

  console.log('=== AdminDashboard レンダリング開始 ===');
  console.log('logs:', logs);
  console.log('logsLoading:', logsLoading);

  const dateRangeInfo = getDateRangeInfo();
  const uniqueVisitors = getUniqueVisitors();
  const locationStats = getLocationStats();
  const pageStats = getPageStats();

  console.log('計算結果:');
  console.log('- dateRangeInfo:', dateRangeInfo);
  console.log('- uniqueVisitors:', uniqueVisitors);
  console.log('- locationStats:', locationStats);
  console.log('- pageStats:', pageStats);

  // 本日の訪問数を計算
  const todayVisits = logs.filter(log => {
    const today = new Date().toDateString();
    const logDate = new Date(log.visited_at).toDateString();
    return logDate === today;
  }).length;

  console.log('本日の訪問数:', todayVisits);
  console.log('=== AdminDashboard レンダリング完了 ===');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 管理者ダッシュボードへのアクセスをログに記録
  useEffect(() => {
    if (isAuthenticated) {
      console.log('管理者ダッシュボードのアクセスをログに記録');
      logVisit(window.location.href, document.referrer);
    }
  }, [isAuthenticated, logVisit]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSeedData = async () => {
    toast.info("データベースに情報を格納中です...");
    try {
      const { error } = await supabase.functions.invoke('seed-subsidy-data');

      if (error) throw error;
      
      toast.success("データベースへの情報格納が完了しました！チャットをお試しください。");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error('データベースのシード中にエラー:', errorMessage);
      toast.error(`データベースへの情報格納中にエラーが発生しました: ${errorMessage}`);
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('全てのログデータを削除しますか？この操作は取り消せません。')) {
      clearAllLogs();
      toast.success("全ログデータを削除しました！");
    }
  };

  const handleCleanupLogs = () => {
    cleanupTestLogs();
    toast.success("テストログと古いデータをクリーンアップしました！");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>読み込み中...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">管理者ダッシュボード</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                ようこそ、{adminUser?.username}さん
              </span>
              <Button onClick={handleCleanupLogs} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <TestTube className="h-4 w-4 mr-2" />
                ログクリーンアップ
              </Button>
              <Button onClick={handleClearLogs} size="sm" variant="destructive">
                <Database className="h-4 w-4 mr-2" />
                全ログ削除
              </Button>
              <Button onClick={handleSeedData} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Database className="h-4 w-4 mr-2" />
                AI用データ格納
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総訪問ログ</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{logs.length}</div>
                <div className="text-xs text-gray-500 mt-1">全期間</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ユニーク訪問者</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueVisitors}</div>
                <div className="text-xs text-gray-500 mt-1">実訪問者数</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本日の訪問</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayVisits}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">データ期間</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {dateRangeInfo.totalDays > 0 
                    ? `${dateRangeInfo.totalDays}日間`
                    : 'データなし'
                  }
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {dateRangeInfo.oldestDate && dateRangeInfo.newestDate
                    ? `${dateRangeInfo.oldestDate.toLocaleDateString('ja-JP')} ～ ${dateRangeInfo.newestDate.toLocaleDateString('ja-JP')}`
                    : '期間なし'
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 統計情報セクション */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  地域別アクセス統計
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {locationStats.length > 0 ? (
                    locationStats.map(([location, count], index) => (
                      <div key={location} className="flex justify-between items-center">
                        <span className="text-sm">{index + 1}. {location}</span>
                        <span className="font-medium">{count}回</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">データがありません</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  ページ別アクセス統計
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pageStats.length > 0 ? (
                    pageStats.map(([page, count], index) => (
                      <div key={page} className="flex justify-between items-center">
                        <span className="text-sm truncate max-w-xs">{index + 1}. {page}</span>
                        <span className="font-medium">{count}回</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">データがありません</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>訪問者ログ詳細</CardTitle>
                <Button onClick={fetchLogs} size="sm">
                  更新
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                {dateRangeInfo.oldestDate && dateRangeInfo.newestDate
                  ? `表示期間: ${dateRangeInfo.oldestDate.toLocaleDateString('ja-JP')} ～ ${dateRangeInfo.newestDate.toLocaleDateString('ja-JP')}`
                  : '表示期間: データなし'
                }
                （総ログ数: {logs.length}件、ユニーク訪問者: {uniqueVisitors}名、期間: {dateRangeInfo.totalDays}日間）
              </div>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div className="text-center py-4">読み込み中...</div>
              ) : logs.length === 0 ? (
                <div className="text-center py-4">
                  <div className="text-gray-500 mb-4">ログデータがありません</div>
                  <div className="text-xs text-gray-400">
                    サイトの各ページにアクセスすると、自動的にログが記録されます
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>訪問日時</TableHead>
                        <TableHead>IPアドレス</TableHead>
                        <TableHead>地域</TableHead>
                        <TableHead>ページURL</TableHead>
                        <TableHead>リファラー</TableHead>
                        <TableHead>ブラウザ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            {new Date(log.visited_at).toLocaleString('ja-JP')}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {log.ip_address}
                          </TableCell>
                          <TableCell>
                            {log.country}
                            {log.city && log.city !== '不明' && (
                              <div className="text-xs text-gray-500">{log.city}</div>
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-sm max-w-xs truncate">
                            {cleanPageUrl(log.page_url).replace(window.location.origin, '') || '/'}
                          </TableCell>
                          <TableCell className="font-mono text-sm max-w-xs truncate">
                            {log.referrer || '-'}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {log.user_agent.includes('Chrome') ? 'Chrome' : 
                             log.user_agent.includes('Firefox') ? 'Firefox' :
                             log.user_agent.includes('Safari') ? 'Safari' :
                             log.user_agent.includes('Edge') ? 'Edge' : 'その他'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
