
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
      return new Response('質問が必要です', { 
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('受信した質問:', question);

    // NotebookLM APIの設定を取得
    const notebookLMApiKey = Deno.env.get('NOTEBOOK_LM_API_KEY');
    const notebookLMEndpoint = 'https://us-central1-aiplatform.googleapis.com/v1/projects/your-project/locations/us-central1/publishers/google/models/notebooklm:predict';

    if (!notebookLMApiKey) {
      console.error('NotebookLM APIキーが設定されていません');
      return new Response('APIキーが設定されていません', { 
        status: 500,
        headers: corsHeaders
      });
    }

    console.log('APIリクエストを開始します');

    // NotebookLM APIにリクエストを送信
    const response = await fetch(notebookLMEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notebookLMApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{
          content: question
        }],
        parameters: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    console.log('APIレスポンスステータス:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NotebookLM APIエラー:', errorText);
      throw new Error(`NotebookLM APIエラー: ${errorText}`);
    }

    const data = await response.json();
    console.log('APIレスポンスデータ:', data);

    // レスポンスを整形して返す
    return new Response(JSON.stringify({
      choices: [{
        message: {
          content: data.predictions[0].content || '申し訳ありません。回答を生成できませんでした。'
        }
      }]
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });

  } catch (error) {
    console.error('チャット関数でエラーが発生:', error);
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
