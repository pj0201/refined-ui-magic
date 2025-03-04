
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    if (!question) {
      return new Response(
        JSON.stringify({ error: '質問が必要です' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('受信した質問:', question);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI APIキーが設定されていません');
      return new Response(
        JSON.stringify({ error: 'APIキーが設定されていません' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. 質問をベクトル化
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: question
      })
    });

    const embeddingData = await embeddingResponse.json();
    
    if (!embeddingData.data || !embeddingData.data[0]) {
      console.error('Embedding APIエラー:', embeddingData);
      return new Response(
        JSON.stringify({ error: 'ベクトル化に失敗しました', details: embeddingData }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const questionEmbedding = embeddingData.data[0].embedding;

    // 2. Supabaseクライアント初期化
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 3. 類似ドキュメントを検索
    const { data: documents, error: searchError } = await supabaseClient.rpc(
      'match_subsidy_docs',
      {
        query_embedding: questionEmbedding,
        match_count: 5
      }
    );

    if (searchError) {
      console.error('ドキュメント検索エラー:', searchError);
      return new Response(
        JSON.stringify({ error: 'ドキュメント検索に失敗しました', details: searchError }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. 関連ドキュメントをプロンプトに組み込む
    let contextText = '';
    let relevantUrls = [];
    
    if (documents && documents.length > 0) {
      contextText = documents
        .map((doc, idx) => `\n\n[関連情報 ${idx + 1} (信頼度: ${doc.score.toFixed(2)})]\n${doc.content}`)
        .join('\n');
      
      // 関連する画像URLも収集
      relevantUrls = documents
        .filter(doc => doc.score > 0.7) // 信頼度が高いもののみ
        .map(doc => ({
          url: doc.source,
          imageUrl: doc.image_url
        }));
    }

    // 5. ChatGPTで回答を生成
    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `あなたは中小企業診断士として、中小企業向けの補助金に関する質問に答えるアシスタントです。
以下の関連情報を参考に、できるだけ正確に回答してください。
情報が不足している場合は、その旨を伝え、公式サイトやメール（hori@planjoy.net）での問い合わせを案内してください。

${contextText}`
          },
          { role: 'user', content: question }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    const chatData = await chatResponse.json();
    
    if (!chatData.choices || chatData.choices.length === 0) {
      console.error('ChatGPT APIエラー:', chatData);
      return new Response(
        JSON.stringify({ error: 'AIによる回答生成に失敗しました', details: chatData }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('ChatGPT応答:', chatData);

    return new Response(
      JSON.stringify({
        choices: [{
          message: {
            content: chatData.choices[0].message.content
          }
        }],
        relevantUrls: relevantUrls,
        context: {
          documentsCount: documents ? documents.length : 0,
          topScore: documents && documents.length > 0 ? documents[0].score : 0
        }
      }), 
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );

  } catch (error) {
    console.error('エラー発生:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error.message
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});
