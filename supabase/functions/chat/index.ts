
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORSプリフライトリクエストの処理
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    if (!question) {
      return new Response('Question is required', { 
        status: 400,
        headers: corsHeaders
      });
    }

    // NotebookLMのAPIエンドポイントとキーを環境変数から取得
    const notebookLMApiKey = Deno.env.get('NOTEBOOK_LM_API_KEY');
    const notebookLMEndpoint = Deno.env.get('NOTEBOOK_LM_ENDPOINT');

    if (!notebookLMApiKey || !notebookLMEndpoint) {
      console.error('NotebookLM credentials are not set');
      return new Response('Configuration error', { 
        status: 500,
        headers: corsHeaders
      });
    }

    // プロンプトの設定
    const systemPrompt = `あなたは日本の補助金制度に詳しいアシスタントです。
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
- 推測に基づく回答を避けること`;

    // NotebookLM APIを呼び出す
    const response = await fetch(notebookLMEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notebookLMApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: question,
        system_prompt: systemPrompt,
        sources: [
          "application_guidelines_jppan.pdf",
          "faq_jppan.pdf",
          "省力化補助金一般形Chatbot.txt"
        ]
      })
    });

    if (!response.ok) {
      console.error('NotebookLM API error:', response.status);
      throw new Error('NotebookLMからの応答の取得に失敗しました');
    }

    const data = await response.json();
    return new Response(JSON.stringify({
      choices: [{
        message: {
          content: data.response
        }
      }]
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response('Internal server error', { 
      status: 500,
      headers: corsHeaders
    });
  }
});
