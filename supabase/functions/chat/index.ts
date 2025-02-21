
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GROQ_API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// 補助金情報のコンテキスト
const subsidyContext = `
# 省力化投資補助金一般形の概要

【補助金名称】
省力化投資補助金一般形

【制度概要】
中小企業・小規模事業者等が生産性向上に資する革新的サービス開発・試作品開発・生産プロセスの改善を行うための設備投資等を支援する制度です。

【対象者】
- 中小企業者（製造業、建設業、運輸業等）
- 中小企業経営強化法に基づく経営革新計画の承認を受けた事業者
- 特定事業者（個人事業主を含む）

【補助対象経費】
- 機械装置・システム構築費
- 技術導入費
- 専門家経費
- 運搬費
- クラウドサービス利用費

【補助率・補助上限額】
- 補助率：中小企業 1/2以内、小規模事業者 2/3以内
- 補助上限額：1,000万円
- 補助下限額：100万円

【申請要件】
1. 事業計画の策定・提出
2. 付加価値額年率3%以上の向上
3. 給与支給総額年率1.5%以上の向上
4. 事業場内最低賃金の地域別最低賃金＋30円以上の達成

【重要なポイント】
- 審査は複数の外部有識者により行われます
- 採択は審査項目に基づく評価点数の高い順に行われます
- 事業完了後5年間の事業化等の状況報告が必要です

【お問い合わせ】
メール：hori@planjoy.net
`;

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
            content: `あなたは日本の補助金制度、特に省力化投資補助金に関する専門家です。
以下の補助金情報を参考に、質問に対して正確な情報を提供してください：

${subsidyContext}

回答は以下のフォーマットで構成してください：

【補助金名称】
該当する補助金の正式名称

【概要】
補助金の目的と概要

【対象者】
- 対象となる事業者や条件
- 除外される事業者がある場合はその条件

【補助金額・補助率】
- 補助金額の上限
- 補助率
- 特記事項

【申請期間】
現在の募集期間や次回の予定（わかる範囲で）

【申請方法】
主な申請手順と必要書類

【備考】
その他の重要な注意事項

【お問い合わせ】
メール：hori@planjoy.net

必ず上記の情報に基づいて回答し、不確かな情報は「確認が必要です」と明記してください。`
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
