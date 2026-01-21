type ReviewDateType = "preset" | "custom";

export interface Decision {
  id: string;
  reviewed: boolean;
  successful: boolean | null;
  decision: string;
  thoughts: string;
  options: string;
  confidence: number;
  expectations: string;
  reviewDateType: ReviewDateType;
  reviewDate: string;
  createdAt: string;
}
