
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

interface GroqError {
  error: {
    message: string;
    type: string;
    param: string | null;
    code: string;
  };
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
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('secret')
      .eq('name', 'GROQ_API_KEY')
      .single();

    if (secretError) {
      console.error('Supabaseエラー:', secretError);
      throw new Error('Groq APIキーの取得に失敗しました');
    }

    if (!secretData) {
      throw new Error('Groq APIキーが設定されていません');
    }

    const apiKey = secretData.secret;
    console.log('APIリクエストを開始します...', { question });
    
    const messages: GroqChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: question.trim() }
    ];

    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: messages,
        temperature: 0.2, // より正確な回答のために温度を下げる
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq APIエラー:', {
        status: response.status,
        statusText: response.statusText,
        errorText
      });

      try {
        const errorData: GroqError = JSON.parse(errorText);
        throw new Error(`Groq APIエラー: ${errorData.error.message}`);
      } catch (parseError) {
        throw new Error(`APIリクエストエラー: ${response.status} ${response.statusText} - ${errorText}`);
      }
    }

    const groqResponse: GroqResponse = await response.json();
    console.log('APIレスポンスを正常に受信しました');
    
    // より詳細な補助金情報の構造化
    return {
      name: "補助金支援情報",
      description: groqResponse.choices[0].message.content,
      requirements: [
        "事業計画の提出が必要です",
        "必要書類の準備が必要です",
        "申請期限を必ず確認してください",
        "詳細は公募要領をご確認ください"
      ],
      period: {
        start: "各補助金で異なります",
        end: "各補助金で異なります"
      },
      amount: "補助金額は事業規模や種類により異なります",
      adoptionRate: "審査により決定", // 採択率情報を追加
      url: "mailto:hori@planjoy.net"
    };
  } catch (error) {
    console.error('generateSubsidyResponseでエラーが発生:', error);
    throw error;
  }
};
