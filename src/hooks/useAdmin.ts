import { useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
}

// 管理者ユーザー情報
const DEFAULT_ADMIN = {
  username: 'peekaboo',
  password: 'peek009'
};

export const useAdmin = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      try {
        setAdminUser(JSON.parse(adminData));
      } catch (error) {
        localStorage.removeItem('adminUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // シンプルな認証（実際のプロダクションでは適切な認証システムを使用）
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      const user = { id: 'admin-1', username };
      setAdminUser(user);
      localStorage.setItem('adminUser', JSON.stringify(user));
      return { success: true };
    } else {
      return { success: false, error: 'ユーザー名またはパスワードが間違っています' };
    }
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  return {
    adminUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!adminUser
  };
};
