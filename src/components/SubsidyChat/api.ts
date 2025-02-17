
interface DeepSeekResponse {
  output: string;
}

const SYSTEM_PROMPT = `
あなたは補助金の専門アドバイザーです。以下のルールに従って回答してください：
1. 補助金に関する質問に対して、具体的で正確な情報を提供してください
2. 情報が不確かな場合は、その旨を伝え、詳細は専門家への相談を推奨してください
3. 回答には必ず申請要件、期間、補助金額の情報を含めてください
4. 最新の情報については「hori@planjoy.net」への問い合わせを案内してください
5. 丁寧な言葉遣いを心がけてください
`;

export const generateSubsidyResponse = async (question: string): Promise<SubsidyInfo> => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data: DeepSeekResponse = await response.json();
    
    // APIレスポンスから補助金情報を構造化
    return {
      name: "補助金支援情報",
      description: data.output,
      requirements: [
        "具体的な要件は事業内容により異なります",
        "申請前に事業計画の準備が必要です",
        "必要書類の準備と期限内の提出が必要です"
      ],
      period: {
        start: "詳細は公募要領をご確認ください",
        end: "詳細は公募要領をご確認ください"
      },
      amount: "補助金額は事業内容により異なります",
      url: "mailto:hori@planjoy.net"
    };
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error;
  }
};
