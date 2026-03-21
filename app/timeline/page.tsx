"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Decision } from "@/shared/types/decision";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { reset, set } from "@/store/slices/decisions";

import { formatReviewDate, isTodayOrPast } from "@lib/formatReviewDate";

import { Header } from "@widgets/header";
import { TabsNav } from "./ui/tabs-nav";
import { DecisionCard } from "./ui/decision-card";

import { data } from "./mocks.json";
const DECISIONS = data as Decision[];

export default function Timeline() {
  const router = useRouter();
  const dispatch = useDispatch();

  const decisions = useSelector((state: RootState) => state.decisions.data);
  const tabs = ["All", "Active", "Completed", "Successful", "Unsuccessful"];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const filteredDecisions = useMemo(() => {
    return decisions.filter((decision) =>
      activeTab === "Active"
        ? !decision.reviewed
        : activeTab === "Completed"
          ? decision.reviewed
          : activeTab === "Successful"
            ? decision.successful === true
            : activeTab === "Unsuccessful"
              ? decision.successful === false
              : decision,
    );
  }, [activeTab]);

  const useDevActions = (action: "set" | "reset") => {
    if (action === "set") dispatch(set(DECISIONS));
    if (action === "reset") dispatch(reset());

    location.reload();
  };

  return (
    <section className="h-full w-full flex flex-col">
      <Header heading="Timeline" />
      <TabsNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <button className="self-start mt-6" onClick={() => useDevActions("set")}>
        <span className="text-darkgray">[DEV]</span> FILL MOCK DATA &gt;&gt;
      </button>
      <button
        className="self-start mt-2"
        onClick={() => useDevActions("reset")}
      >
        <span className="text-darkgray">[DEV]</span> CLEAR MOCK DATA &gt;&gt;
      </button>

      <section className="mt-6 h-full overflow-y-auto">
        {filteredDecisions.length > 0 ? (
          filteredDecisions.map((decision, i) => {
            const firstItem = i === 0;
            const lastItem = i === filteredDecisions.length - 1;

            const status =
              isTodayOrPast(decision.reviewDate) && !decision.reviewed
                ? "Pending a review"
                : !isTodayOrPast(decision.reviewDate) && !decision.reviewed
                  ? "Review"
                  : "Reviewed";

            const id = decision.id;

            return (
              <DecisionCard
                key={id}
                id={id}
                decision={decision.decision}
                thoughts={decision.thoughts}
                confidence={decision.confidence}
                reviewDate={formatReviewDate(decision.reviewDate)}
                successful={decision.successful}
                firstItem={firstItem}
                lastItem={lastItem}
                status={status}
                onClick={() => router.push(`/decision-detail/${id}`)}
              />
            );
          })
        ) : (
          <p className="mt-6 text-center text-darkgray">Nothing here yet</p>
        )}
      </section>
    </section>
  );
}
