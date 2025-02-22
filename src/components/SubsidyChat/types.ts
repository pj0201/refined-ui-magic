
export interface Message {
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

export interface SubsidyInfo {
  question?: string;
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
  content?: string;
}
