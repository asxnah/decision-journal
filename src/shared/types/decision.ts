type ReviewDateType = "preset" | "custom";

export interface Decision {
  id: string;
  decision: string;
  thoughts: string;
  options: string;
  confidence: number;
  expectations: string;
  reviewDateType: ReviewDateType;
  reviewDate: string;
  createdAt: string;
}
