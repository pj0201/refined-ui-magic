
export async function createEmbedding(content: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is not configured')
  }
  
  const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: content
    })
  })

  const embeddingData = await embeddingResponse.json()
  
  if (!embeddingData.data || !embeddingData.data[0]) {
    console.error('ベクトル化APIレスポンスエラー:', embeddingData)
    throw new Error('コンテンツのベクトル化中にエラーが発生しました')
  }
  
  return embeddingData.data[0].embedding
}
