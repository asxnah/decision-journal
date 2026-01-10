"use client";

import { useState } from "react";

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

  return (
    <section className="h-full w-full">
      <Header heading="Timeline" />
      <TabsNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <section
        className="mt-6 h-full overflow-y-auto"
        style={{ height: "calc(100% - 48px - 48px - 48px)" }} // костыль
      >
        {decisions.length > 0 ? (
          decisions.map((decision, i) => {
            const firstItem = i === 0;
            const lastItem = i === decisions.length - 1;

            const reviewDate =
              decision.reviewDateType === "preset"
                ? decision.reviewDate
                : formatReviewDate(decision.reviewDate);

            const pendingReview =
              decision.reviewDateType !== "preset" &&
              isTodayOrPast(decision.reviewDate);

            return (
              <DecisionCard
                key={i}
                decision={decision.decision}
                thoughts={decision.thoughts}
                confidence={decision.confidence}
                reviewDate={reviewDate}
                firstItem={firstItem}
                lastItem={lastItem}
                pendingReview={pendingReview}
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
