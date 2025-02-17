
import { SubsidyInfo } from "./types";

export const formatSubsidyResponse = (info: SubsidyInfo): string => {
  return `
${info.name}について説明させていただきます：

【制度概要】
${info.description}

【申請要件】
${info.requirements.map(req => `・${req}`).join('\n')}

【申請期間】
${info.period.start} から ${info.period.end} まで

【補助金額】
${info.amount}

${info.adoptionRate ? `【採択率】\n${info.adoptionRate}` : ''}

${info.url ? `\n詳細はこちらをご確認ください：${info.url}` : ''}
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
  return subsidyKeywords.some(keyword => text.includes(keyword));
};
