
import { SubsidyInfo } from "./types";

export const formatSubsidyResponse = (info: SubsidyInfo): string => {
  return `
【補助金名称】
${info.name}

【制度概要】
${info.description}

【対象者】
${info.requirements.map(req => `・${req}`).join('\n')}

【補助金額・補助率】
${info.amount}

${info.adoptionRate ? `【採択率】\n${info.adoptionRate}\n` : ''}

【申請期間】
${info.period.start} から ${info.period.end} まで

より詳しい内容については、お気軽にメールにてお問い合わせください。
メール：hori@planjoy.net
  `.trim();
};

export const isSubsidyRelatedQuestion = (text: string): boolean => {
  const subsidyKeywords = [
    "補助金",
    "助成金",
    "支援金",
    "給付金",
    "ものづくり",
    "持続化",
    "IT導入",
    "事業再構築",
  ];
  
  // 補助金関連のキーワードがある場合は true を返す
  if (subsidyKeywords.some(keyword => text.includes(keyword))) {
    return true;
  }
  
  // それ以外の一般的な会話の場合は false を返す
  return false;
};
