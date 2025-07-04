export interface VisitorLog {
  id: string;
  ip_address: string;
  user_agent: string;
  page_url: string;
  referrer: string;
  country: string;
  city: string;
  visited_at: string;
}

export interface LocationInfo {
  ip: string;
  country: string;
  city: string;
}

export interface DateRangeInfo {
  oldestDate: Date | null;
  newestDate: Date | null;
  totalDays: number;
}