
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { corsHeaders } from "./utils/cors.ts"
import { authenticateRequest } from "./auth/authenticator.ts"
import { generateEmbedding } from "./openai/embeddings.ts"
import { searchDocuments } from "./database/documents.ts"
import { generateChatResponse } from "./openai/chat.ts"
import { handleError } from "./utils/error-handler.ts"

serve(async (req) => {
  // CORS プリフライトリクエストの処理
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. 認証チェック
    const userData = await authenticateRequest(req);
    
    // 2. リクエストボディの解析
    const { question } = await req.json();
    if (!question) {
      return new Response(
        JSON.stringify({ error: '質問が必要です' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('受信した質問:', question);

    // 3. 質問をベクトル化
    const questionEmbedding = await generateEmbedding(question);

    // 4. 類似ドキュメントを検索
    const { documents, relevantUrls } = await searchDocuments(questionEmbedding);

    // 5. ChatGPTで回答を生成
    const chatData = await generateChatResponse(question, documents);
    
    // 6. レスポンスの返却
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
    return handleError(error);
  }
});
