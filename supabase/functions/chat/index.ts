
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    if (!question) {
      return new Response('質問が必要です', { 
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('受信した質問:', question);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI APIキーが設定されていません');
      return new Response('APIキー未設定', { 
        status: 500,
        headers: corsHeaders
      });
    }

    // Step 1: 質問の直接的な意図とキーワードの抽出
    const keywordResponse = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `補助金に関する質問から、以下の情報を抽出してください：

1. 質問の種類: 必ず以下のいずれかを選択（複数選択不可）
   - 申請期間
   - 補助金額
   - 補助率
   - 申請要件
   - 対象経費
   - その他

2. 主要な質問キーワード: 質問の核となる単語を1つだけ抽出
   例：「申請期間」「補助率」「対象経費」など

3. 回答に必要な最低限の情報を指定
   例：申請期間の場合 → "開始日、終了日"
   例：補助率の場合 → "企業規模別の補助率"

回答は必ず以下のJSON形式で返してください：
{
  "questionType": "申請期間 | 補助金額 | 補助率 | 申請要件 | 対象経費 | その他",
  "keyword": "主要なキーワード1つのみ",
  "requiredInfo": ["必要な情報1", "必要な情報2"]
}
絶対に上記以外のフォーマットで返さないでください。`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.1,
        max_tokens: 500,
      })
    });

    const keywordData = await keywordResponse.json();
    const analysis = JSON.parse(keywordData.choices[0].message.content);
    console.log('キーワード分析結果:', analysis);

    // 申請期間に関する具体的な情報
    const scheduleInfo = {
      "申請期間": {
        "開始": "令和6年4月1日",
        "受付期間": "令和6年4月中旬～5月末日",
        "審査期間": "約1～2ヶ月",
        "交付決定": "令和6年7月下旬"
      }
    };

    // 補助金額・補助率に関する具体的な情報
    const amountInfo = {
      "補助金額": {
        "上限": "1,000万円",
        "下限": "100万円"
      },
      "補助率": {
        "中小企業": "1/2以内",
        "小規模事業者": "2/3以内"
      }
    };

    // Step 2: 質問タイプに基づいて回答を生成
    let responsePrompt = `
あなたは補助金の専門家です。以下の質問に対して、具体的な情報を提供してください。

質問: "${question}"

分析結果:
質問タイプ: ${analysis.questionType}
キーワード: ${analysis.keyword}

`;

    // 質問タイプに応じて適切な情報を追加
    if (analysis.questionType === "申請期間") {
      responsePrompt += `
具体的な申請スケジュールは以下の通りです：
・公募開始：${scheduleInfo.申請期間.開始}（予定）
・申請受付期間：${scheduleInfo.申請期間.受付期間}（予定）
・審査期間：${scheduleInfo.申請期間.審査期間}
・交付決定：${scheduleInfo.申請期間.交付決定}（予定）

※スケジュールは変更となる可能性があります。
`;
    }

    responsePrompt += `
回答の注意点：
1. ${analysis.keyword}に関する情報を最優先で説明してください。
2. 具体的な数値や期間を明確に示してください。
3. 予定や変更の可能性がある場合は、その旨を明記してください。
4. 簡潔かつ分かりやすい言葉で説明してください。
5. 最後に、より詳しい情報についてメール（hori@planjoy.net）での問い合わせが可能な旨を付記してください。
`;

    // 回答の生成
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: responsePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI APIエラー:', errorText);
      throw new Error('応答の生成に失敗しました');
    }

    const data = await response.json();
    console.log('生成された回答:', data.choices[0].message.content);

    return new Response(JSON.stringify({
      choices: [{
        message: {
          content: data.choices[0].message.content
        }
      }]
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('エラーが発生:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error.message
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
});
