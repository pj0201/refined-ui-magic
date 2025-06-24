import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { useVisitorLogs } from '@/hooks/useVisitorLogs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Users, Eye, Calendar, Database } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { adminUser, logout, isAuthenticated, isLoading } = useAdmin();
  const { logs, isLoading: logsLoading, fetchLogs, getLogRetentionInfo } = useVisitorLogs();
  const navigate = useNavigate();

  const retentionInfo = getLogRetentionInfo();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

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
                <CardTitle className="text-sm font-medium">総訪問者数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{logs.length}</div>
                <div className="text-xs text-gray-500 mt-1">6月1日以降</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本日の訪問</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {logs.filter(log => {
                    const today = new Date().toDateString();
                    return new Date(log.visited_at).toDateString() === today;
                  }).length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">最新訪問</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {logs.length > 0 
                    ? new Date(logs[0].visited_at).toLocaleString('ja-JP')
                    : 'データなし'
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">保存期間</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {retentionInfo.oldestDate 
                    ? `${retentionInfo.totalDays}日間`
                    : 'データなし'
                  }
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  6月1日から現在まで
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>訪問者ログ</CardTitle>
                <Button onClick={fetchLogs} size="sm">
                  更新
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                表示期間: 2024年6月1日 ～ 現在
                （{retentionInfo.totalDays}日間のデータ、{logs.length}件）
              </div>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div className="text-center py-4">読み込み中...</div>
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
                            {log.country === '日本' ? `${log.country} ${log.city}` : log.country}
                          </TableCell>
                          <TableCell className="font-mono text-sm max-w-xs truncate">
                            {log.page_url.replace(window.location.origin, '')}
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
