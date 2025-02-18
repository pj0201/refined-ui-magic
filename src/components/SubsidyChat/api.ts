
import { SubsidyInfo } from "./types";
import { supabase } from "@/integrations/supabase/client";

interface GroqChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
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
    console.log('===== デバッグ情報 =====');
    console.log('1. Supabaseクエリ開始');
    
    // まず全てのsecretsを取得して確認
    const { data: allSecrets, error: allSecretsError } = await supabase
      .from('secrets')
      .select('*');
    
    console.log('全てのsecrets:', allSecrets);
    console.log('エラー確認:', allSecretsError);

    // 特定のキーを取得
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('secret')
      .eq('name', 'GROQ_API_KEY')
      .maybeSingle();

    console.log('2. GROQ_API_KEY検索結果');
    console.log('データ:', secretData);
    console.log('エラー:', secretError);

    if (secretError) {
      console.error('Supabaseエラー:', secretError);
      throw new Error(`Supabaseエラー: ${secretError.message}`);
    }

    if (!secretData?.secret) {
      console.error('APIキーが見つかりません。secretData:', secretData);
      throw new Error('APIキーが設定されていません');
    }

    const apiKey = secretData.secret.trim();
    console.log('3. APIキー情報');
    console.log('キーの長さ:', apiKey.length);
    console.log('キーの形式確認:', apiKey.startsWith('sk-') ? 'OK (sk- で始まる)' : 'NG (sk- で始まっていない)');

    const messages: GroqChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: question }
    ];

    console.log('4. Groq APIリクエスト準備');
    const requestBody = {
      model: 'mixtral-8x7b-32768',
      messages: messages,
      temperature: 0.2,
      max_tokens: 2000,
    };

    console.log('リクエスト内容:', JSON.stringify(requestBody, null, 2));

    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('5. Groq APIレスポンス');
    console.log('ステータス:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq APIエラー詳細:', errorText);
      throw new Error(`Groq APIエラー: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('レスポンスデータ:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('不正なレスポンス形式:', data);
      throw new Error('APIからの応答が不正な形式です');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('6. 処理完了');

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
