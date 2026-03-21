"use client";

import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { resetCurrent } from "@/store/slices/decision";
import { add } from "@/store/slices/decisions";

import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

import { Button } from "@ui/button";
import { Header } from "@widgets/header";
import { DecisionDetails } from "@ui/decision-details";

export default function DecisionDetail() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const decision = useSelector((state: RootState) => state.decision.data);

  const goToTimeline = () => router.push("/timeline");

  if (!decision.decision) {
    goToTimeline();
  }

  const handleFinish = () => {
    if (!decision.decision) goToTimeline();

    dispatch(resetCurrent());
    dispatch(
      add({
        ...decision,
        id: uuidv4(),
      }),
    );
    goToTimeline();
  };

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        <Header heading="Decision Detail" />
        <DecisionDetails decision={decision} />
      </div>

      <Button content="Save decision" onClick={handleFinish} />
    </section>
  );
}
