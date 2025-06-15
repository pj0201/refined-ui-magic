export interface Topic {
  id: number;
  isNew?: boolean;
  content: string;
  date?: string;
  link?: string;
  keywords?: string[];
}

export const topics: Topic[] = [
  {
    id: 1,
    isNew: true,
    content: "AI導入支援サポート\nAI活用で業務を変革。貴社の課題に合わせた最適なAIソリューションを提案します",
    date: "2026/04",
    link: "/ai-support",
    keywords: ["AI", "DX", "研修", "業務効率化", "神戸", "兵庫"]
  },
  {
    id: 2,
    content: "2025/3 小規模持続化補助金公募要領（暫定版）が公表されました。\n（詳細は本ページのチャットボットへどうぞ)",
    date: "2025/03",
    keywords: ["補助金", "小規模持続化補助金", "神戸", "兵庫"]
  },
  {
    id: 6,
    content: "省力化投資補助金（生産性向上投資促進税制）についてのご案内\n（詳細は本ページのチャットボットへどうぞ）",
    date: "2025/02",
    keywords: ["補助金", "省力化投資", "生産性向上", "税制", "神戸", "兵庫"]
  },
  {
    id: 3,
    content: "経営者保証に関するガイドラインの活用で保証なし融資が拡大中",
    date: "2024/09",
    link: "/plans/keieisha-hosho",
    keywords: ["融資", "経営者保証", "ガイドライン", "神戸", "兵庫"]
  },
  {
    id: 4,
    content: "AI用語について",
    link: "/ai-glossary",
    keywords: ["AI", "経営コンサルティング", "ビジネス活用", "デジタル化"]
  },
  {
    id: 5,
    content: "おすすめのAIツール一覧",
    link: "/ai-tools",
    keywords: ["AI", "業務効率化", "神戸", "兵庫", "デジタルトランスフォーメーション"]
  }
];
