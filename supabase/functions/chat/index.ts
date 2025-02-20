
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

    // NotebookLM APIを呼び出す
    const response = await fetch(notebookLMEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notebookLMApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: question,
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
