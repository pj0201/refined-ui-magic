
export async function generateEmbedding(question: string): Promise<number[]> {
  // OpenAI API キーの確認
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    console.error('OpenAI APIキーが設定されていません');
    throw new Error('APIキーが設定されていません');
  }

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
    throw new Error('ベクトル化に失敗しました');
  }
  
  return embeddingData.data[0].embedding;
}
