import React, { useState } from 'react';
import { useVisitorLogs } from '@/hooks/useVisitorLogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ADMIN_CREDENTIALS = {
  id: '729393',
  password: '729393'
};

const AdminLoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginId === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password) {
      onLogin();
    } else {
      setError('ログインIDまたはパスワードが正しくありません');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">管理者ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loginId">ログインID</Label>
              <Input
                id="loginId"
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { 
    logs, 
    isLoading, 
    error, 
    getUniqueVisitors, 
    getLocationStats, 
    getDateRangeInfo,
    clearAllLogs 
  } = useVisitorLogs();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-600">エラー: {error}</div>
        </div>
      </div>
    );
  }

  const uniqueVisitors = getUniqueVisitors();
  const locationStats = getLocationStats();
  const dateRangeInfo = getDateRangeInfo();

  // 日別の訪問者統計を計算
  const getDailyStats = () => {
    const dailyStats: { [key: string]: { total: number; unique: Set<string> } } = {};
    
    logs.forEach(log => {
      const date = new Date(log.visited_at).toLocaleDateString('ja-JP');
      if (!dailyStats[date]) {
        dailyStats[date] = { total: 0, unique: new Set() };
      }
      dailyStats[date].total += 1;
      dailyStats[date].unique.add(log.ip_address);
    });

    return Object.entries(dailyStats)
      .map(([date, stats]) => ({
        date,
        total: stats.total,
        unique: stats.unique.size
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10); // 最新10日分
  };

  const dailyStats = getDailyStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">管理者ページ</h1>
            <p className="text-gray-600">サイト訪問者統計</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            ログアウト
          </Button>
        </div>

        {/* サマリー統計 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">総訪問数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{logs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">ユニーク訪問者</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{uniqueVisitors}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">データ期間</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{dateRangeInfo.totalDays}日</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">管理</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={clearAllLogs}
                variant="destructive"
                size="sm"
                className="w-full"
              >
                データクリア
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 日別統計 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">日別訪問者統計</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                <div>日付</div>
                <div>総訪問数</div>
                <div>ユニーク訪問者</div>
              </div>
              {dailyStats.map((stat) => (
                <div key={stat.date} className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">{stat.date}</div>
                  <div className="text-blue-600">{stat.total}</div>
                  <div className="text-green-600">{stat.unique}</div>
                </div>
              ))}
              {dailyStats.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  データがありません
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 地域別統計 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">地域別訪問者統計</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                <div>地域</div>
                <div>訪問数</div>
              </div>
              {locationStats.map(([location, count]) => (
                <div key={location} className="grid grid-cols-2 gap-4 text-sm">
                  <div className="font-medium">{location}</div>
                  <div className="text-blue-600">{count}</div>
                </div>
              ))}
              {locationStats.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  データがありません
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLoginForm onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default AdminPage;