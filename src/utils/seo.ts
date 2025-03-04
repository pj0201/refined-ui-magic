
/**
 * SEO関連のユーティリティ関数
 */

export interface SeoProps {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}

// 重要なSEOキーワード
export const coreKeywords = [
  'AI',
  '神戸',
  '兵庫',
  '補助金',
  '融資',
  '創業',
  '承継',
  '経営コンサルティング',
  '事業計画',
  '中小企業診断士'
];

// デフォルトのSEO設定
export const defaultSeo: SeoProps = {
  title: 'PLANNINGJOY株式会社 | 神戸・兵庫の経営コンサルティング',
  description: '神戸・兵庫を拠点に、AI活用した経営コンサルティング、補助金申請サポート、創業支援から事業承継まで、あらゆる経営課題に対応します。',
  keywords: coreKeywords,
  ogImage: '/og-image.png',
  ogType: 'website',
};

// キーワードを適切に配置するためのヘルパー関数
export function optimizeContent(text: string, keywords: string[] = coreKeywords): string {
  let optimizedText = text;
  
  // キーワードの自然な挿入（すでに含まれていなければ）
  keywords.forEach((keyword) => {
    if (!optimizedText.includes(keyword) && Math.random() > 0.7) {
      const sentences = optimizedText.split('. ');
      if (sentences.length > 3) {
        const randomIndex = Math.floor(Math.random() * (sentences.length - 2)) + 1;
        sentences[randomIndex] = `${sentences[randomIndex]}（${keyword}に関する専門知識があります）`;
        optimizedText = sentences.join('. ');
      }
    }
  });
  
  return optimizedText;
}
