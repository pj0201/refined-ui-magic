
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
    content: "2025年3月より申請開始\n新たに一般形が追加され利用しやすくなった「中小企業省力化投資補助金一般形」が始まります。\n（詳細は本ページのチャットボットへどうぞ)",
    date: "2025/03",
    keywords: ["補助金", "融資", "中小企業", "神戸", "兵庫"]
  },
  {
    id: 2,
    isNew: true,
    content: "NEW 2025/3 小規模持続化補助金公募要領（暫定版）が公表されました。\n（詳細は本ページのチャットボットへどうぞ)",
    date: "2025/03",
    keywords: ["補助金", "小規模持続化補助金", "神戸", "兵庫"]
  },
  {
    id: 3,
    content: "AI用語について",
    link: "/ai-glossary",
    keywords: ["AI", "経営コンサルティング"]
  },
  {
    id: 4,
    content: "おすすめのAIツール一覧",
    link: "/ai-tools",
    keywords: ["AI", "業務効率化", "神戸", "兵庫"]
  }
];
