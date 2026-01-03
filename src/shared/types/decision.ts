type ReviewDateType = "preset" | "custom";

interface Decision {
  decision: string;
  thoughts: string;
  options: string;
  confidence: number;
  expectations: string;
  reviewDateType: ReviewDateType;
  reviewDate: string;
}
