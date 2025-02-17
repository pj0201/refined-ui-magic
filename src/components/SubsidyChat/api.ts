import { SubsidyInfo } from "./types";
import { createClient } from '@supabase/supabase-js';

interface DeepSeekResponse {
  output: string;
}

const SYSTEM_PROMPT = `
あなたは補助金の専門アドバイザーです。以下のルールに従って回答してください：
1. 補助金に関する質問に対して、具体的で正確な情報を提供してください
2. 情報が不確かな場合は、その旨を伝え、詳細は専門家への相談を推奨してください
3. 回答には必ず申請要件、期間、補助金額の情報を含めてください
4. 最新の情報については「hori@planjoy.net」への問い合わせを案内してください
5. 丁寧な言葉遣いを心がけてください
`;

const supabaseUrl = 'https://txqvmvvbbykoyfbkdasd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const generateSubsidyResponse = async (question: string): Promise<SubsidyInfo> => {
  try {
    console.log('API Request starting...');
    
    // Supabaseのedge functionを呼び出す実装に変更する予定
    // 現在は一時的なモック応答を返します
    return {
      name: "補助金支援情報",
      description: "申し訳ありませんが、現在システムは更新中です。詳細は担当者にお問い合わせください。",
      requirements: [
        "具体的な要件は事業内容により異なります",
        "申請前に事業計画の準備が必要です",
        "必要書類の準備と期限内の提出が必要です"
      ],
      period: {
        start: "詳細は公募要領をご確認ください",
        end: "詳細は公募要領をご確認ください"
      },
      amount: "補助金額は事業内容により異なります",
      url: "mailto:hori@planjoy.net"
    };
  } catch (error) {
    console.error('Error in generateSubsidyResponse:', error);
    throw error;
  }
};
