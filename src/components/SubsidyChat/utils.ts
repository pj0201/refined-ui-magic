
import { SubsidyDetail, SubsidyInfo } from "./types";

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

export const formatSubsidyDetailToInfo = (detail: SubsidyDetail): SubsidyInfo => {
  return {
    name: detail.title || detail.name,
    description: detail.detail || detail.subsidy_catch_phrase || "詳細情報は公式サイトでご確認ください。",
    requirements: [
      detail.target_number_of_employees || "対象となる従業員規模の制限については公式サイトでご確認ください。",
      detail.industry ? `対象業種: ${detail.industry}` : "対象業種については公式サイトでご確認ください。",
      detail.target_area_detail || detail.target_area_search || "対象地域については公式サイトでご確認ください。"
    ],
    period: {
      start: detail.acceptance_start_datetime ? new Date(detail.acceptance_start_datetime).toLocaleDateString('ja-JP') : "未定",
      end: detail.acceptance_end_datetime ? new Date(detail.acceptance_end_datetime).toLocaleDateString('ja-JP') : "未定"
    },
    amount: detail.subsidy_max_limit ? 
      `上限${detail.subsidy_max_limit.toLocaleString()}円${detail.subsidy_rate ? `（補助率：${detail.subsidy_rate}）` : ''}` : 
      "補助金額は公式サイトでご確認ください。",
    url: detail.front_subsidy_detail_page_url
  };
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
