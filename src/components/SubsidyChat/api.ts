
import { SubsidyInfo } from "./types";
import { supabase } from "@/integrations/supabase/client";

interface GroqChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  choices: [{
    message: {
      content: string;
    }
  }]
}

const SYSTEM_PROMPT = `
あなたは日本の補助金制度に詳しいアシスタントです。
以下のルールを厳密に守って回答してください：

# 必須出力項目
1. 補助金名称
2. 事業概要
3. 補助対象者
4. 補助対象経費
5. 補助金額・補助率
6. 申請期間
7. 申請要件
8. 参考URL・問い合わせ先

# 回答ルール
1. 上記の項目を必ず含め、構造化された形で回答すること
2. 不確かな情報は「確認が必要です」と明示すること
3. 古い情報の場合は、最新の情報の確認を促すこと
4. 具体的な金額や期限は、出典と共に提示すること
5. 問い合わせ先として「hori@planjoy.net」を必ず含めること

# エラー防止
- 情報が不明確な場合は、その旨を明示すること
- 誤った情報を提供しないこと
- 推測に基づく回答を避けること
`;

export const generateSubsidyResponse = async (question: string): Promise<SubsidyInfo> => {
  try {
    console.log('補助金応答の生成を開始します...');
    
    // データベースクエリを実行する前にログを追加
    console.log('Supabaseからシークレットを取得します...');
    
    const { data: secrets, error: secretError } = await supabase
      .from('secrets')
      .select('*');

    if (secretError) {
      console.error('Supabaseエラー:', secretError);
      throw new Error('APIキーの取得に失敗しました');
    }

    console.log('取得したシークレット:', secrets);

    const groqApiKey = secrets?.find(secret => secret.name === 'GROQ_API_KEY')?.secret;

    if (!groqApiKey) {
      console.error('GROQ_API_KEYが見つかりません');
      throw new Error('APIキーが設定されていません');
    }

    console.log('APIキーの取得に成功しました');
    
    const messages: GroqChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: question }
    ];

    console.log('Groq APIにリクエストを送信します...');

    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: messages,
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error('Groq APIエラー:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('エラーの詳細:', errorText);
      throw new Error(`Groq APIエラー: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Groq APIからのレスポンス:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('不正なレスポンス形式:', data);
      throw new Error('APIからの応答が不正な形式です');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('AI応答の内容:', aiResponse);

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
    console.error('補助金応答の生成中にエラーが発生:', error);
    throw error;
  }
};
