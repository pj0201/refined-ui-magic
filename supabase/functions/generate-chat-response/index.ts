import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "https://esm.sh/@google/generative-ai@0.15.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!googleApiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Required environment variables are not set.');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const genAI = new GoogleGenerativeAI(googleApiKey);

    const { messages, subsidyKey } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('Messages are required in the request body.');
    }

    const lastUserMessage = messages.findLast(m => m.role === 'user')?.content;
    if (!lastUserMessage) {
      throw new Error("No user message found to generate context.");
    }

    // 1. ユーザーの質問の意図をベクトル化
    const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const embeddingResult = await embeddingModel.embedContent(lastUserMessage);
    const embedding = embeddingResult.embedding.values;

    // 2. Supabase DBから関連情報を検索 (p_source を使ってDB側でフィルタリング)
    const { data: documents, error: rpcError } = await supabase.rpc('match_subsidy_docs', {
      p_query_embedding: embedding,
      p_match_count: 3, // 必要な件数だけ取得
      p_source: subsidyKey, // subsidyKey を使ってソースでフィルタリング
    });

    if (rpcError) {
      console.error('Supabase RPC error:', rpcError);
      throw new Error(`Failed to retrieve subsidy documents: ${rpcError.message}`);
    }
    
    // DB側でフィルタリングするため、JSでのフィルタリング処理は不要になりました。

    const context = documents && documents.length > 0
      ? documents.map(doc => `・${doc.content}`).join('\n')
      : "";

    const systemInstruction = `あなたは、日本の補助金に関する専門家アシスタントです。提供された「コンテキスト」情報に基づいて、ユーザーからの質問に正確かつ丁寧に回答してください。コンテキストに情報がない、または無関係な場合は、推測で答えず正直に「関連情報が見つかりませんでした。より具体的なキーワードで再度お試しいただけますか？」と回答してください。回答は日本語で行ってください。\n\n以下がコンテキストです：\n---\n${context}\n---`;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest",
      systemInstruction,
    });

    const geminiMessages = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));

    const result = await model.generateContent({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.2,
        },
        safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
    });
    
    const response = await result.response;
    const generatedText = response.text();
    
    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-chat-response function:', error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
