"use client";

import { useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

import { formatReviewDate, isTodayOrPast } from "@lib/formatReviewDate";

import { Header } from "@widgets/header";
import { TabsNav } from "./ui/tabs-nav";
import { DecisionCard } from "./ui/decision-card";

export default function Timeline() {
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

  return (
    <section className="h-full w-full">
      <Header heading="Timeline" />
      <TabsNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <section
        className="mt-6 h-full overflow-y-auto"
        style={{ height: "calc(100% - 48px - 48px - 48px)" }} // костыль
      >
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

            return (
              <DecisionCard
                key={decision.id}
                id={decision.id}
                decision={decision.decision}
                thoughts={decision.thoughts}
                confidence={decision.confidence}
                reviewDate={formatReviewDate(decision.reviewDate)}
                firstItem={firstItem}
                lastItem={lastItem}
                status={status}
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
