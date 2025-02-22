
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

    // Step 1: キーワード抽出と質問意図の詳細分析
    const analysisResponse = await fetch(OPENAI_API_ENDPOINT, {
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
            content: `あなたは質問分析の専門家です。
補助金に関する質問を詳細に分析し、以下の情報をJSON形式で抽出してください：

1. メインキーワード: 質問の主要な対象や概念（例：申請期間、補助率、対象経費）
2. 関連キーワード: メインキーワードに関連する重要な単語や表現
3. 質問の種類: 以下のカテゴリから最も適切なものを選択
   - 申請期間・スケジュール
   - 補助金額・補助率
   - 申請要件・対象者
   - 申請手続き・書類
   - 補助対象経費
   - その他
4. 質問の具体性: "具体的" または "一般的"
5. 必要な回答要素: 質問に適切に回答するために必要な情報項目をリスト

回答は以下のJSON形式で返してください：
{
  "mainKeyword": "主要キーワード",
  "relatedKeywords": ["関連キーワード1", "関連キーワード2"],
  "questionType": "質問の種類",
  "specificity": "具体的/一般的",
  "requiredInfo": ["必要な情報1", "必要な情報2"]
}`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      })
    });

    if (!analysisResponse.ok) {
      throw new Error('質問分析に失敗しました');
    }

    const analysisData = await analysisResponse.json();
    const analysis = JSON.parse(analysisData.choices[0].message.content);
    console.log('質問分析結果:', analysis);

    // Step 2: 分析結果に基づいて回答を生成
    const responsePrompt = `
質問: "${question}"

分析結果:
主要キーワード: ${analysis.mainKeyword}
関連キーワード: ${analysis.relatedKeywords.join(', ')}
質問タイプ: ${analysis.questionType}
具体性: ${analysis.specificity}
必要な情報: ${analysis.requiredInfo.join(', ')}

以下の情報を元に、上記の質問に対して具体的で的確な回答を提供してください。
特に、主要キーワード「${analysis.mainKeyword}」に関する情報を最優先で説明してください。

# 補助金制度の詳細情報

【申請期間・スケジュール】
- 公募開始：令和6年4月1日（予定）
- 申請受付：令和6年4月中旬～5月末日（予定）
- 審査期間：約1～2ヶ月
- 交付決定：令和6年7月下旬（予定）
※スケジュールは変更となる可能性があります

【補助金額・補助率】
- 補助上限額：1,000万円
- 補助下限額：100万円
- 補助率：
  * 中小企業 1/2以内
  * 小規模事業者 2/3以内

【申請要件・対象者】
対象となる事業者：
- 中小企業者（製造業、建設業、運輸業等）
- 中小企業経営強化法に基づく経営革新計画の承認を受けた事業者
- 特定事業者（個人事業主を含む）

必須要件：
1. 事業計画の策定・提出
2. 付加価値額年率3%以上の向上
3. 給与支給総額年率1.5%以上の向上
4. 事業場内最低賃金の地域別最低賃金＋30円以上の達成

【補助対象経費】
以下の経費が補助対象となります：
- 機械装置・システム構築費
- 技術導入費
- 専門家経費
- 運搬費
- クラウドサービス利用費

【申請手続き】
必要書類：
1. 事業計画書
2. 決算書（直近2年分）
3. 登記簿謄本
4. 納税証明書
5. 経営革新計画（該当する場合）

回答のルール：
1. ${analysis.mainKeyword}に関する情報を最優先で説明してください。
2. 具体的な数値、期間、要件を明確に示してください。
3. 回答は簡潔かつ実用的な情報を中心にまとめてください。
4. 不確定要素がある場合は、その旨を明記してください。
5. メールでの問い合わせ先も必ず記載してください。`;

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
          },
          {
            role: "user",
            content: "この情報を元に、質問に対する具体的な回答を提供してください。"
          }
        ],
        temperature: 0.5,
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
