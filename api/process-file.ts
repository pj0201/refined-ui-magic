
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { kv } from '@vercel/kv';

export const runtime = 'edge';

async function extractTextFromDocument(fileUrl: string, fileExt: string) {
  const openAIApiKey = process.env.OPENAI_API_KEY;
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is not configured');
  }
  
  const promptText = fileExt === 'pdf'
    ? '以下のPDF文書から補助金に関する情報を全て抽出してください。特に、補助金の名前、対象者、条件、申請期間、補助率、上限額などの重要情報を詳細に含めてください。'
    : '以下の画像から補助金に関する情報を全て抽出してください。特に、補助金の名前、対象者、条件、申請期間、補助率、上限額などの重要情報を詳細に含めてください。';
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
                url: fileUrl
              }
            }
          ]
        }
      ],
      max_tokens: 4000
    })
  });
  
  const data = await response.json();
  
  if (!data.choices || !data.choices[0]) {
    throw new Error('テキスト抽出中にエラーが発生しました');
  }
  
  return data.choices[0].message.content;
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
    throw new Error('コンテンツのベクトル化中にエラーが発生しました');
  }
  
  return data.data[0].embedding;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'ファイルがアップロードされていません' }, { status: 400 });
    }

    const fileName = file.name;
    const fileExt = fileName.split('.').pop()?.toLowerCase();
    
    if (fileExt !== 'png' && fileExt !== 'pdf') {
      return NextResponse.json({ 
        error: 'PNGまたはPDFファイルのみアップロード可能です' 
      }, { status: 400 });
    }

    // ファイルをVercel Blobにアップロード
    const { url } = await put(fileName, file, {
      access: 'public',
    });

    // テキスト抽出
    const content = await extractTextFromDocument(url, fileExt);
    
    // ベクトル化
    const embedding = await createEmbedding(content);

    // データをVercel KVに保存
    const docId = `doc:${Date.now()}`;
    await kv.hset(docId, {
      content,
      embedding: JSON.stringify(embedding),
      source: fileName,
      image_url: url,
      created_at: new Date().toISOString()
    });

    // ドキュメントIDをリストに追加
    await kv.sadd('documents', docId);

    return NextResponse.json({
      message: 'ファイルが正常に処理されました',
      filePath: fileName,
      publicUrl: url,
      content: content
    });

  } catch (error) {
    console.error('処理エラー:', error);
    return NextResponse.json({
      error: '処理中にエラーが発生しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
