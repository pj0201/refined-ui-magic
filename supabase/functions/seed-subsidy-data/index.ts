
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.15.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Data copied from src/data/subsidyInfo.ts
const shorikikaSubsidyInfo = {
  name: "中小企業省力化投資補助金（一般型）",
  description: "人手不足の中小企業などが、省力化効果のあるオーダーメイド・セミオーダーメイド性のある設備やシステムなどを導入し、「労働生産性 年平均成長率4%向上」を目指す事業計画に取り組むものが対象です。",
  requirements: [
    "労働生産性の年平均成長率が+4%以上増加",
    "1人あたり給与支給総額の年平均成長率が事業実施都道府県における最低賃金の直近5年間の年平均成長率以上または給与支給総額の年平均成長率が+4%以上上昇",
    "事業所内最低賃金が事業実施都道府県における最低賃金+30円以上の水準",
    "次世代育成支援対策推進法に基づく一般事業主行動計画を公表など（従業員数21名以上の場合のみ）の基本要件すべてを満たすこと"
  ],
  period: {
    start: "公募開始日",
    end: "随時"
  },
  amount: `従業員規模に応じた補助上限額：
- 5名以下：750万円（大幅賃上げの場合1,000万円）
- 6～20名：1,500万円（同2,000万円）
- 21～50名：3,000万円（同4,000万円）
- 51～100名：5,000万円（同6,500万円）
- 101名以上：8,000万円（同1億円）
    
補助率：
- 中小企業：1/2
- 小規模・再生事業者：2/3`,
  adoptionRate: "公募回制での審査により決定",
};

const shoukiboSubsidyInfo = {
  name: "小規模事業者持続化補助金（一般型）",
  description: "小規模事業者が持続的な経営に向けた経営計画を自ら策定し、販路開拓や生産性向上の取組を支援する制度です。",
  requirements: [
    "商業・サービス業（宿泊・娯楽業除く）: 常時使用する従業員の数 5人以下",
    "宿泊業・娯楽業: 常時使用する従業員の数 20人以下",
    "製造業その他: 常時使用する従業員の数 20人以下",
    "一人社長や個人事業主も対象となります。",
    "補助事業の終了後、売上が増加または維持され、事業が継続されていること"
  ],
  period: {
    start: "公募開始後",
    end: "各回締切日まで"
  },
  amount: `補助上限額：
- 通常枠: 50万円
- 賃金引上枠、卒業枠、後継者支援枠、創業枠: 200万円
- インボイス特例対象事業者は上記に50万円上乗せ
      
補助率：
- 原則 2/3 (賃金引上枠のうち赤字事業者は 3/4)`,
  adoptionRate: "公募回や申請枠により変動。概ね50%〜70%程度",
};

function formatSubsidyContext(info: any): string {
  return `
# ${info.name}

## 概要
${info.description}

## 主な要件
${info.requirements.map((r: string) => `- ${r}`).join('\n')}

## 公募期間
${info.period.start}〜${info.period.end}

## 補助額・補助率
${info.amount}

## 採択率
${info.adoptionRate}
  `.trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!googleApiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Required environment variables are not set.');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const genAI = new GoogleGenerativeAI(googleApiKey);
    const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const subsidies = [
      { key: 'shorikika', data: shorikikaSubsidyInfo },
      { key: 'shoukibo', data: shoukiboSubsidyInfo },
    ];

    for (const subsidy of subsidies) {
      console.log(`[SEED] Processing ${subsidy.key}...`);
      const content = formatSubsidyContext(subsidy.data);

      const { error: deleteError } = await supabase
        .from('subsidy_docs')
        .delete()
        .eq('source', subsidy.key);

      if (deleteError) {
        throw new Error(`[SEED] Failed to delete old data for ${subsidy.key}: ${deleteError.message}`);
      }
      console.log(`[SEED] Old data for ${subsidy.key} deleted.`);

      const embeddingResult = await embeddingModel.embedContent(content);
      const embedding = embeddingResult.embedding.values;
      console.log(`[SEED] Embedding created for ${subsidy.key}.`);

      const { error: insertError } = await supabase
        .from('subsidy_docs')
        .insert({
          content: content,
          embedding: embedding,
          source: subsidy.key,
        });
      
      if (insertError) {
        throw new Error(`[SEED] Failed to insert new data for ${subsidy.key}: ${insertError.message}`);
      }
      console.log(`[SEED] New data for ${subsidy.key} inserted successfully.`);
    }

    return new Response(JSON.stringify({ message: "Database seeded successfully!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in seed-subsidy-data function:', error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
