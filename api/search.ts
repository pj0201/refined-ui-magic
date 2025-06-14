
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const runtime = 'edge';

// ベクトル間のコサイン類似度を計算
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

async function createEmbedding(content: string) {
  const openAIApiKey = process.env.OPENAI_API_KEY;
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is not configured');
  }
  
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: content
    })
  });

  const data = await response.json();
  
  if (!data.data || !data.data[0]) {
    throw new Error('クエリのベクトル化中にエラーが発生しました');
  }
  
  return data.data[0].embedding;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'クエリが必要です' }, { status: 400 });
    }

    // クエリをベクトル化
    const queryEmbedding = await createEmbedding(query);

    // すべてのドキュメントIDを取得
    const documentIds = await kv.smembers('documents');

    // 各ドキュメントとの類似度を計算
    const results = [];
    for (const docId of documentIds) {
      const doc = await kv.hgetall(docId);
      if (doc && doc.embedding) {
        const docEmbedding = JSON.parse(doc.embedding as string);
        const similarity = cosineSimilarity(queryEmbedding, docEmbedding);
        
        results.push({
          id: docId,
          content: doc.content,
          source: doc.source,
          score: similarity
        });
      }
    }

    // 類似度でソートして上位3件を返す
    results.sort((a, b) => b.score - a.score);
    
    return NextResponse.json(results.slice(0, 3));

  } catch (error) {
    console.error('検索エラー:', error);
    return NextResponse.json({
      error: '検索中にエラーが発生しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
