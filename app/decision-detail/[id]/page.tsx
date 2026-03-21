"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
import { getSingle } from "@/store/slices/decisions";

import { Button } from "@ui/button";
import { Header } from "@widgets/header";
import { DecisionDetails } from "@ui/decision-details";

export default function DecisionDetail() {
  const router = useRouter();
  const { id } = useParams();

  const decision = useSelector((state: RootState) => {
    if (!id || Array.isArray(id)) return null;
    return getSingle(state, id);
  });

  useEffect(() => {
    if (!id || Array.isArray(id) || !decision?.decision) {
      router.push("/timeline");
    }
  }, [id, decision, router]);

  if (!id || Array.isArray(id) || !decision?.decision) {
    return null;
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
