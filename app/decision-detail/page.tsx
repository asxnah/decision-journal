"use client";

import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { reset } from "@/store/slices/decision";
import { add } from "@/store/slices/decisions";

import { formatDate } from "@lib/formatDate";
import { formatReviewDate } from "@lib/formatReviewDate";

import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

import { Button } from "@ui/button";
import { Header } from "@widgets/header";

export default function DecisionDetail() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const decision = useSelector((state: RootState) => state.decision.data);
  let reviewDate;

  if (!decision) {
    return <p className="text-darkgray">No decision found.</p>;
  }

  switch (decision.reviewDate) {
    case "In 1 month":
      reviewDate = "Review in 30 days";
      break;
    case "In 3 months":
      reviewDate = "Review in 3 months";
      break;
    case "In 6 months":
      reviewDate = "Review in 6 months";
      break;

    default:
      reviewDate = `Review ${formatReviewDate(
        decision.reviewDate
      ).toLowerCase()}`;
      break;
  }

  const handleFinish = () => {
    if (!decision) return;

    dispatch(reset());
    dispatch(
      add({
        ...decision,
        id: uuidv4(),
      }),
    );
    router.push("/timeline");
  };

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        <Header heading="Decision Detail" />

        <div className="grid gap-6">
          <dl className="grid gap-6">
            <div className="grid gap-0.5">
              <dt className="text-sm text-darkgray">The decision</dt>
              <dd className="text-xl font-medium">{decision.decision}</dd>
            </div>

            <div className="grid gap-0.5">
              <dt className="text-sm text-darkgray">Made on</dt>
              <dd className="text-xl font-medium">
                {formatDate(decision.createdAt)}
              </dd>
            </div>

            <div className="grid gap-0.5">
              <dt className="text-sm text-darkgray">Review scheduled</dt>
              <dd className="text-xl font-medium">
                {decision.reviewDateType === "custom"
                  ? formatDate(decision.reviewDate)
                  : decision.reviewDate}
              </dd>
            </div>
          </dl>

          <section aria-labelledby="context-heading">
            <h2 id="context-heading" className="text-xl font-medium">
              Context at the time
            </h2>
            <p className="text-darkgray">{decision.thoughts}</p>
          </section>

          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="text-xl font-medium">
              Options considered
            </h2>
            <p className="text-darkgray list-disc pl-5 space-y-0">
              {decision.options
                .split("•")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((option, i) => (
                  <li key={i} className="text-darkgray">
                    {option}
                  </li>
                ))}
            </p>
          </section>
        </div>

        <p className="mt-6">{reviewDate}</p>
      </div>

      <Button content="Save decision" onClick={handleFinish} />
    </section>
  );
}
