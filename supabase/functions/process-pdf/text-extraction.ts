
export async function extractTextFromDocument(publicUrl: string, fileExt: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is not configured')
  }
  
  const promptText = fileExt === 'pdf'
    ? '以下のPDF文書から補助金に関する情報を全て抽出してください。特に、補助金の名前、対象者、条件、申請期間、補助率、上限額などの重要情報を詳細に含めてください。'
    : '以下の画像から補助金に関する情報を全て抽出してください。特に、補助金の名前、対象者、条件、申請期間、補助率、上限額などの重要情報を詳細に含めてください。'
  
  const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: promptText
            },
            {
              type: 'image_url',
              image_url: {
                url: publicUrl
              }
            }
          ]
        }
      ],
      max_tokens: 4000
    })
  })
  
  const visionData = await visionResponse.json()
  
  if (!visionData.choices || !visionData.choices[0]) {
    console.error('OpenAI APIレスポンスエラー:', visionData)
    throw new Error('テキスト抽出中にエラーが発生しました')
  }
  
  return visionData.choices[0].message.content
}
