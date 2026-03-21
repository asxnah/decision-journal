"use client";

import { useRouter, useParams } from "next/navigation";

import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
import { getSingle } from "@/store/slices/decisions";

import { Button } from "@ui/button";
import { Header } from "@widgets/header";
import { DecisionDetails } from "@ui/decision-details";

export default function DecisionDetail() {
  const router = useRouter();

  const goToTimeline = () => router.push("/timeline");

  const { id } = useParams();
  if (!id || Array.isArray(id)) return goToTimeline();

  const decision = useSelector((state: RootState) => getSingle(state, id));

  if (!decision?.decision) {
    return goToTimeline();
  }

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        <Header heading="Decision Detail" />
        <DecisionDetails decision={decision} />
      </div>

      <Button content="Reflect" onClick={() => router.push(`/reflect/${id}`)} />
    </section>
  );
}
