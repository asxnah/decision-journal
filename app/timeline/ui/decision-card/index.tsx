import { Decision } from "@shared-types/decision";

interface DecisionCardProps
  extends Pick<
    Decision,
    "decision" | "thoughts" | "confidence" | "reviewDate"
  > {
  firstItem: boolean;
  lastItem: boolean;
  pendingReview: boolean;
}

export const DecisionCard = ({
  decision,
  thoughts,
  confidence,
  reviewDate,
  firstItem,
  lastItem,
  pendingReview,
}: DecisionCardProps) => {
  return (
    <article className="flex gap-2.5">
      <div aria-hidden={true} className="flex flex-col items-center">
        {!firstItem && <div className="w-0.5 h-full bg-lightgray"></div>}
        <div className="flex-none w-3 h-3 rounded-full bg-lightgray"></div>
        {!lastItem && <div className="w-0.5 h-full bg-lightgray"></div>}
      </div>

      <div className={`${!lastItem && "mb-6"} grid gap-5 flex-1`}>
        <header>
          <h2 className="font-medium text-xl">{decision}</h2>
        </header>

        <p>{thoughts}</p>

        <div className="grid gap-1">
          <p className="flex items-center justify-between">
            <span className="text-sm text-darkgray">Confidence</span>
            <data value={confidence}>{confidence}%</data>
          </p>

          <div
            className="h-2 w-full rounded overflow-hidden flex"
            aria-hidden={true}
          >
            <div
              className="h-full flex-none bg-black"
              style={{ width: `${confidence}%` }}
            ></div>
            <div className="h-full w-full bg-lightgray"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-darkgray" htmlFor="reviewDate">
            {pendingReview ? "Pending a Review" : "Review Date"}
          </label>
          <time id="reviewDate" dateTime={reviewDate}>
            {reviewDate}
          </time>
        </div>
      </div>
    </article>
  );
};
