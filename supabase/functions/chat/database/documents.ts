
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

interface Document {
  id: number;
  content: string;
  source: string;
  image_url?: string;
  score: number;
}

interface SearchResult {
  documents: Document[] | null;
  relevantUrls: Array<{url: string; imageUrl?: string}>;
}

export async function searchDocuments(questionEmbedding: number[]): Promise<SearchResult> {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: documents, error: searchError } = await supabaseClient.rpc(
    'match_subsidy_docs',
    {
      query_embedding: questionEmbedding,
      match_count: 5
    }
  );

  if (searchError) {
    console.error('ドキュメント検索エラー:', searchError);
    throw new Error('ドキュメント検索に失敗しました');
  }

  let relevantUrls: Array<{url: string; imageUrl?: string}> = [];
  
  if (documents && documents.length > 0) {
    // 関連する画像URLも収集
    relevantUrls = documents
      .filter(doc => doc.score > 0.7) // 信頼度が高いもののみ
      .map(doc => ({
        url: doc.source,
        imageUrl: doc.image_url
      }));
  }

  return { documents, relevantUrls };
}
