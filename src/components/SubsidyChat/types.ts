
export interface Message {
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

export interface SubsidyInfo {
  name: string;
  description: string;
  requirements: string[];
  period: {
    start: string;
    end: string;
  };
  amount: string;
  adoptionRate?: string;
  url?: string;
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
