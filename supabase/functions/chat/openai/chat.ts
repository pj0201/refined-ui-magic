
interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    }
  }>;
}

export async function generateChatResponse(question: string, documents: any[] | null): Promise<ChatResponse> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    throw new Error('OpenAI APIキーが設定されていません');
  }

  // 関連ドキュメントをプロンプトに組み込む
  let contextText = '';
  
  if (documents && documents.length > 0) {
    contextText = documents
      .map((doc, idx) => `\n\n[関連情報 ${idx + 1} (信頼度: ${doc.score.toFixed(2)})]\n${doc.content}`)
      .join('\n');
  }

  const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `あなたは中小企業診断士として、中小企業向けの補助金に関する質問に答えるアシスタントです。
以下の関連情報を参考に、できるだけ正確に回答してください。
情報が不足している場合は、その旨を伝え、公式サイトやメール（hori@planjoy.net）での問い合わせを案内してください。

${contextText}`
        },
        { role: 'user', content: question }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })
  });

  const chatData = await chatResponse.json();
  
  if (!chatData.choices || chatData.choices.length === 0) {
    console.error('ChatGPT APIエラー:', chatData);
    throw new Error('AIによる回答生成に失敗しました');
  }

  console.log('ChatGPT応答:', chatData);
  return chatData;
}
