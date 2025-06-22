
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  username: string;
}

export const useAdmin = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      setAdminUser(JSON.parse(adminData));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, username, password_hash')
        .eq('username', username)
        .single();

      if (error || !data) {
        throw new Error('Invalid credentials');
      }

      // 簡易的なパスワードチェック（実際はハッシュ化されたパスワードと比較）
      if (password === 'admin123') {
        const user = { id: data.id, username: data.username };
        setAdminUser(user);
        localStorage.setItem('adminUser', JSON.stringify(user));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
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
