
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

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

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI APIキーが設定されていません');
      return new Response('APIキー未設定', { 
        status: 500,
        headers: corsHeaders
      });
    }

    // GPT-4を使用して質問に回答
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `あなたは省力化投資補助金の専門アシスタントです。
以下の情報を元に、質問に対して具体的で実用的な回答を提供してください。

# 補助金制度の詳細情報

【補助金額・補助率】
- 補助上限額：1,000万円
- 補助下限額：100万円
- 補助率：
  * 中小企業 1/2以内
  * 小規模事業者 2/3以内

【申請要件・対象者】
対象となる事業者：
- 中小企業者（製造業、建設業、運輸業等）
- 中小企業経営強化法に基づく経営革新計画の承認を受けた事業者
- 特定事業者（個人事業主を含む）

必須要件：
1. 事業計画の策定・提出
2. 付加価値額年率3%以上の向上
3. 給与支給総額年率1.5%以上の向上
4. 事業場内最低賃金の地域別最低賃金＋30円以上の達成

【補助対象経費】
以下の経費が補助対象となります：
- 機械装置・システム構築費
- 技術導入費
- 専門家経費
- 運搬費
- クラウドサービス利用費

【申請手続き】
必要書類：
1. 事業計画書
2. 決算書（直近2年分）
3. 登記簿謄本
4. 納税証明書
5. 経営革新計画（該当する場合）

回答のルール：
1. 質問の種類（補助金額、申請要件、対象経費など）に応じて、関連する情報を優先的に提供してください。
2. 具体的な数値や要件を含めて回答してください。
3. 曖昧な表現は避け、明確な情報を提供してください。
4. 質問の内容が不明確な場合は、関連する複数の観点から情報を提供してください。
5. 回答は簡潔に、かつ実用的な情報を中心にまとめてください。`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.5,
        max_tokens: 1000,
      })
    });

    console.log('APIレスポンスステータス:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI APIエラー:', errorText);
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
