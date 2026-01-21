"use client";

import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { reset } from "@/store/slices/decision";
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

  if (!decision) {
    return <p className="text-darkgray">No decision found.</p>;
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
        <DecisionDetails decision={decision} />
      </div>

      <Button content="Save decision" onClick={handleFinish} />
    </section>
  );
}
