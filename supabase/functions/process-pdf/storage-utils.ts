
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

export async function setupStorage(supabase: ReturnType<typeof createClient>) {
  // ストレージバケットの作成（存在しない場合）
  const { data: bucketExists } = await supabase
    .storage
    .listBuckets()

  if (!bucketExists.find(b => b.name === 'subsidy_docs')) {
    const { error: createBucketError } = await supabase
      .storage
      .createBucket('subsidy_docs', { public: true })

    if (createBucketError) {
      console.error('バケット作成エラー:', createBucketError)
      throw createBucketError
    }
  }
}

export async function uploadFile(
  supabase: ReturnType<typeof createClient>, 
  filePath: string, 
  file: File
) {
  const { data, error } = await supabase.storage
    .from('subsidy_docs')
    .upload(filePath, file)
    
  if (error) {
    console.error('ファイルアップロードエラー:', error)
    throw error
  }
  
  return data
}

export function getPublicUrl(
  supabase: ReturnType<typeof createClient>, 
  filePath: string
) {
  const { data: { publicUrl } } = supabase.storage
    .from('subsidy_docs')
    .getPublicUrl(filePath)
    
  return publicUrl
}
