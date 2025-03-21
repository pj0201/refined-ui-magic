
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { 
  corsHeaders, 
  handleOptionsRequest, 
  createErrorResponse, 
  createSuccessResponse 
} from "./http-utils.ts"
import { validateFile } from "./file-utils.ts"
import { setupStorage, uploadFile, getPublicUrl } from "./storage-utils.ts"
import { extractTextFromDocument } from "./text-extraction.ts"
import { createEmbedding } from "./vector-utils.ts"
import { saveDocumentData } from "./database-utils.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return handleOptionsRequest()
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    // ファイルの検証
    const fileValidation = validateFile(file as File | null)
    if (!fileValidation.valid) {
      return createErrorResponse(fileValidation.error)
    }

    const { fileName, fileExt, filePath } = fileValidation

    // Supabaseクライアントの初期化
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // ストレージの設定
    await setupStorage(supabase)

    // ファイルのアップロード
    try {
      await uploadFile(supabase, filePath, file as File)
    } catch (uploadError) {
      return createErrorResponse('ファイルのアップロードに失敗しました', 500)
    }

    // ファイルのURLを取得
    const publicUrl = getPublicUrl(supabase, filePath)

    try {
      // テキスト抽出処理
      const fileContent = await extractTextFromDocument(publicUrl, fileExt)
      console.log('抽出されたコンテンツ:', fileContent)

      // OpenAI APIを使用してテキストをベクトル化
      const embedding = await createEmbedding(fileContent)

      // ベクトルとメタデータをデータベースに保存
      await saveDocumentData(supabase, {
        content: fileContent,
        embedding: embedding,
        source: fileName,
        image_url: publicUrl
      })

      return createSuccessResponse({ 
        message: 'ファイルが正常に処理されました',
        filePath: filePath,
        publicUrl: publicUrl,
        content: fileContent
      })
    } catch (processingError) {
      console.error('処理エラー:', processingError)
      return createErrorResponse(
        '処理中にエラーが発生しました', 
        500, 
        processingError.message
      )
    }

  } catch (error) {
    console.error('予期せぬエラー:', error)
    return createErrorResponse(
      '予期せぬエラーが発生しました', 
      500, 
      error.message
    )
  }
})
