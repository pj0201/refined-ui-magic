
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { decode } from "https://deno.land/std@0.177.0/encoding/base64.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'ファイルがアップロードされていません' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Supabaseクライアントの初期化
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // ファイル名から拡張子を取得
    const fileName = file.name
    const fileExt = fileName.split('.').pop()?.toLowerCase()

    if (fileExt !== 'pdf') {
      return new Response(
        JSON.stringify({ error: 'PDFファイルのみアップロード可能です' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // ファイルパスの生成（一意のIDを使用）
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    // ファイルのアップロード
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('subsidy_docs')
      .upload(filePath, file)

    if (uploadError) {
      console.error('ファイルアップロードエラー:', uploadError)
      return new Response(
        JSON.stringify({ error: 'ファイルのアップロードに失敗しました' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // PDFの内容をテキストに変換（この部分は簡易的な実装です）
    const fileContent = "PDFの内容をテキストに変換した結果がここに入ります"

    // OpenAI APIを使用してテキストをベクトル化
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: fileContent
      })
    })

    const embeddingData = await embeddingResponse.json()
    const embedding = embeddingData.data[0].embedding

    // ベクトルとメタデータをデータベースに保存
    const { error: dbError } = await supabase
      .from('subsidy_docs')
      .insert({
        content: fileContent,
        embedding: embedding,
        source: fileName
      })

    if (dbError) {
      console.error('データベース保存エラー:', dbError)
      return new Response(
        JSON.stringify({ error: 'データの保存に失敗しました' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ 
        message: 'ファイルが正常に処理されました',
        filePath: filePath
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('予期せぬエラー:', error)
    return new Response(
      JSON.stringify({ error: '予期せぬエラーが発生しました' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
