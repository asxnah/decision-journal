"use client";

import { useRouter, useParams } from "next/navigation";

import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
import { get } from "@/store/slices/decisions";

import { Button } from "@ui/button";
import { Header } from "@widgets/header";
import { DecisionDetails } from "@ui/decision-details";

export default function DecisionDetail() {
  const router = useRouter();

  const { id } = useParams();
  if (!id || Array.isArray(id)) return router.push("/timeline");

  const decision = useSelector((state: RootState) => get(state, id));

  if (!decision) {
    return <p className="text-darkgray">No decision found.</p>;
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
