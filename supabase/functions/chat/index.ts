
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

    // 最初に質問の意図を理解するためのプロンプト
    const intentResponse = await fetch(GROQ_API_ENDPOINT, {
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
            content: `あなたは補助金に関する質問の意図を理解し、適切なカテゴリに分類する専門家です。
以下のカテゴリから最も適切なものを選んでください：

1. 補助金額・補助率に関する質問
2. 申請要件・対象者に関する質問
3. 申請手続き・必要書類に関する質問
4. 補助対象経費に関する質問
5. 申請期間・スケジュールに関する質問
6. その他の一般的な質問

回答は数字のみを返してください。`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.3,
        max_tokens: 10,
      })
    });

    if (!intentResponse.ok) {
      throw new Error('意図分析に失敗しました');
    }

    const intentData = await intentResponse.json();
    const questionCategory = intentData.choices[0].message.content.trim();
    console.log('質問カテゴリ:', questionCategory);

    // カテゴリに基づいて詳細な回答を生成
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
            content: `あなたは省力化投資補助金の専門家です。以下の情報に基づいて、質問に対して具体的で正確な回答を提供してください。

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

ユーザーの質問カテゴリは${questionCategory}です。
この分類に基づいて、特に関連性の高い情報を中心に、具体的で実用的な回答を提供してください。
曖昧な表現は避け、できるだけ具体的な数値や要件を含めて回答してください。`
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
