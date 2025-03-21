
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

export async function saveDocumentData(
  supabase: ReturnType<typeof createClient>,
  data: {
    content: string,
    embedding: any,
    source: string,
    image_url: string
  }
) {
  const { error } = await supabase
    .from('subsidy_docs')
    .insert(data)

  if (error) {
    console.error('データベース保存エラー:', error)
    throw error
  }
}
