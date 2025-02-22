
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GROQ_API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    if (!question) {
      return new Response('質問が必要です', { 
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('受信した質問:', question);

    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    if (!groqApiKey) {
      console.error('GROQ APIキーが設定されていません');
      return new Response('APIキー未設定', { 
        status: 500,
        headers: corsHeaders
      });
    }

    const response = await fetch(GROQ_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: `あなたは省力化投資補助金に関する専門アシスタントです。質問に対して、以下のルールに従って回答してください：

1. 「分かりません」「確認が必要です」などの曖昧な回答は避け、具体的な情報を提供してください。
2. 一般的な質問（「はい」「いいえ」で終わる質問）への回答は避け、詳しい情報を提供してください。
3. 申請期間や具体的な日程については、「本事業のホームページにて公開されます」と案内してください。
4. 補助金に関する具体的な情報は以下を参考に回答を構成してください：

【補助金制度の概要】
- 中小企業・小規模事業者等の生産性向上支援
- 革新的サービス開発、試作品開発、生産プロセス改善の設備投資支援
- 補助率：中小企業1/2以内、小規模事業者2/3以内
- 補助上限額：1,000万円
- 補助下限額：100万円

【対象となる事業者】
- 中小企業者（製造業、建設業、運輸業等）
- 中小企業経営強化法に基づく経営革新計画承認事業者
- 特定事業者（個人事業主を含む）

【補助対象経費】
- 機械装置・システム構築費
- 技術導入費
- 専門家経費
- 運搬費
- クラウドサービス利用費

【申請要件】
1. 事業計画の策定・提出
2. 付加価値額年率3%以上の向上
3. 給与支給総額年率1.5%以上の向上
4. 事業場内最低賃金の地域別最低賃金＋30円以上の達成`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      })
    });

    console.log('APIレスポンスステータス:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GROQ APIエラー:', errorText);
      throw new Error('応答の生成に失敗しました');
    }

    const data = await response.json();
    console.log('APIレスポンスデータ:', data);

    return new Response(JSON.stringify({
      choices: [{
        message: {
          content: data.choices[0].message.content
        }
      }]
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('エラーが発生:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error.message
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
});
