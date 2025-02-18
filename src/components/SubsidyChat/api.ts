
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

interface Document {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const SYSTEM_PROMPT = `
あなたは日本の補助金制度に詳しいアシスタントです。
以下のルールに従って回答してください：

1. 補助金に関する質問に対して、必要な場合は根拠となる情報を示しながら回答してください
2. 情報が不確かな場合は、その旨を伝え、詳細は専門家への相談を推奨してください
3. 回答には必ず申請要件、期間、補助金額の情報を含めてください
4. 最新の情報については「hori@planjoy.net」への問い合わせを案内してください
5. 丁寧な言葉遣いを心がけてください
6. 関連する外部サイトがある場合はリンクを提示してください
`;

export const generateSubsidyResponse = async (question: string): Promise<SubsidyInfo> => {
  try {
    // SupabaseからGroq APIキーを取得
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
    
    // Groq APIにリクエストを送信
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
        temperature: 0.7,
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
    
    return {
      name: "補助金支援情報",
      description: groqResponse.choices[0].message.content,
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
    console.error('generateSubsidyResponseでエラーが発生:', error);
    throw error;
  }
};
