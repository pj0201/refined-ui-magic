
export interface SubsidySearchParams {
  keyword: string;
  sort: 'created_date' | 'acceptance_start_datetime' | 'acceptance_end_datetime';
  order: 'ASC' | 'DESC';
  acceptance: '0' | '1';
  use_purpose?: string;
  industry?: string;
  target_number_of_employees?: string;
  target_area_search?: string;
}

export interface SubsidySearchResponse {
  metadata: {
    type: string;
    resultset: {
      count: number;
    };
  };
  result: SubsidySearchResult[];
}

export interface SubsidySearchResult {
  id: string;
  name: string;
  title?: string;
  target_area_search?: string;
  subsidy_max_limit?: number;
  acceptance_start_datetime?: string;
  acceptance_end_datetime?: string;
  target_number_of_employees?: string;
}

export interface SubsidyDetailResponse {
  metadata: {
    type: string;
    resultset: {
      count: number;
    };
  };
  result: SubsidyDetail[];
}

export interface SubsidyDetail {
  id: string;
  name: string;
  title?: string;
  subsidy_catch_phrase?: string;
  detail?: string;
  use_purpose?: string;
  industry?: string;
  target_area_search?: string;
  target_area_detail?: string;
  target_number_of_employees?: string;
  subsidy_rate?: string;
  subsidy_max_limit?: number;
  acceptance_start_datetime?: string;
  acceptance_end_datetime?: string;
  project_end_deadline?: string;
  front_subsidy_detail_page_url?: string;
}

const API_BASE_URL = 'https://api.jgrants-portal.go.jp/exp/v1/public';

export const searchSubsidies = async (params: SubsidySearchParams): Promise<SubsidySearchResponse> => {
  const queryParams = new URLSearchParams({
    keyword: params.keyword,
    sort: params.sort,
    order: params.order,
    acceptance: params.acceptance,
    ...(params.use_purpose && { use_purpose: params.use_purpose }),
    ...(params.industry && { industry: params.industry }),
    ...(params.target_number_of_employees && { target_number_of_employees: params.target_number_of_employees }),
    ...(params.target_area_search && { target_area_search: params.target_area_search }),
  });

  const response = await fetch(`${API_BASE_URL}/subsidies?${queryParams}`);
  if (!response.ok) {
    throw new Error('補助金情報の取得に失敗しました');
  }
  return response.json();
};

export const getSubsidyDetail = async (id: string): Promise<SubsidyDetailResponse> => {
  const response = await fetch(`${API_BASE_URL}/subsidies/id/${id}`);
  if (!response.ok) {
    throw new Error('補助金詳細情報の取得に失敗しました');
  }
  return response.json();
};

export const extractKeywords = (text: string): string[] => {
  const keywords = [
    "ものづくり",
    "IT導入",
    "持続化",
    "事業再構築",
    "研究開発",
    "設備投資",
    "人材育成",
    "販路開拓",
    "創業",
    "事業承継"
  ];
  
  return keywords.filter(keyword => text.includes(keyword));
};

export const analyzeQuestion = (text: string): SubsidySearchParams => {
  const keywords = extractKeywords(text);
  
  return {
    keyword: keywords.length > 0 ? keywords[0] : text,
    sort: 'acceptance_start_datetime',
    order: 'DESC',
    acceptance: '1', // 募集中の補助金のみを検索
  };
};
