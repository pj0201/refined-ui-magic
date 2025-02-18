
import { SubsidyInfo } from "./types";
import { supabase } from "@/integrations/supabase/client";

export const generateSubsidyResponse = async (question: string): Promise<SubsidyInfo> => {
  try {
    console.log('===== デバッグ情報 =====');
    console.log('1. Edge Function呼び出し開始');
    console.log('質問内容:', question);
    
    // Edge Function を直接呼び出す
    const response = await fetch(
      'https://txqvmvvbbykoyfbkdasd.functions.supabase.co/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ question })
      }
    );

    console.log('2. Edge Functionレスポンス');
    if (!response.ok) {
      console.error('Edge Functionエラー:', response.status, response.statusText);
      throw new Error('チャットレスポンスの取得に失敗しました');
    }

    const data = await response.json();
    console.log('3. レスポンスデータ:', data);

    if (!data?.choices?.[0]?.message?.content) {
      console.error('不正なレスポンス形式:', data);
      throw new Error('APIからの応答が不正な形式です');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('4. 処理完了');

    return {
      name: "補助金情報",
      description: aiResponse,
      requirements: [
        "事業計画の提出",
        "必要書類の準備",
        "申請期限の確認",
        "詳細は個別にご確認ください"
      ],
      period: {
        start: "各補助金により異なります",
        end: "各補助金により異なります"
      },
      amount: "補助金額は案件により異なります",
      adoptionRate: "審査により決定されます",
      url: "mailto:hori@planjoy.net"
    };
  } catch (error) {
    console.error('エラー詳細:', error);
    throw error;
  }
};
