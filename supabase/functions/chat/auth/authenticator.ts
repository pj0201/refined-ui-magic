
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { corsHeaders } from "../utils/cors.ts";

export async function authenticateRequest(req: Request) {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // 認証トークンの取得とユーザー検証
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    // 匿名アクセスを許可するが、ログに記録
    console.log('認証なしでアクセスがありました');
    return null;
  } else {
    // JWT トークンの検証
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError) {
      console.error('認証エラー:', authError);
      throw new Error(`認証に失敗しました: ${authError.message}`);
    }
    
    console.log('認証済みユーザー:', userData?.user?.email);
    return userData;
  }
}
