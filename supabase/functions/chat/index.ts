
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
            content: `あなたは日本の補助金制度に詳しいアシスタントです。
以下のフォーマットで回答を構成してください：

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

必ず上記の項目に沿って、簡潔かつ正確な情報を提供してください。不確かな情報は「確認が必要です」と明記してください。`
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
