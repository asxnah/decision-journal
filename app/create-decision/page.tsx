"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";
import { set } from "@/store/slices/decision";

import { Header } from "@widgets/header";
import { ProgressBar } from "@ui/progressbar";
import { Button } from "@ui/button";

import { DecisionStep } from "./widgets/decision";
import { FeelingsStep } from "./widgets/feelings";
import { OptionsStep } from "./widgets/options";

export default function CreateDecision() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [stepNumber, setStepNumber] = useState<1 | 2 | 3>(1);
  const { decision, thoughts, options, confidence } = useSelector(
    (state: RootState) => state.decision.data
  );

  const buttonDisabled = useMemo(() => {
    switch (stepNumber) {
      case 1:
        return decision.trim() === "" || thoughts.trim() === "";
      case 2:
        return options.trim() === "";
      case 3:
        return false;
      default:
        return true;
    }
  }, [stepNumber, decision, thoughts, options]);

  const handleNext = () => {
    if (stepNumber === 3) {
      router.push("/expectations");
    } else {
      setStepNumber((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleNavigation = (number: 1 | 2 | 3) => {
    if (number === 2 && decision.trim() === "" && thoughts.trim() === "") return;
    if (number === 3 && options.trim() === "") return;
    setStepNumber(number);
  };

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        <Header
          heading="Create Decision"
          icon={
            <ProgressBar stepNumber={stepNumber} onClick={handleNavigation} />
          }
        />

        {stepNumber === 1 && (
          <DecisionStep
            decision={decision}
            thoughts={thoughts}
            onDecisionChange={(value) =>
              dispatch(set({ key: "decision", value }))
            }
            onThoughtsChange={(value) =>
              dispatch(set({ key: "thoughts", value }))
            }
          />
        )}

        {stepNumber === 2 && (
          <OptionsStep
            options={options}
            onChange={(value) => dispatch(set({ key: "options", value }))}
          />
        )}

        {stepNumber === 3 && (
          <FeelingsStep
            confidence={confidence}
            onChange={(value) => dispatch(set({ key: "confidence", value }))}
          />
        )}
      </div>

      <Button content="Next" onClick={handleNext} disabled={buttonDisabled} />
    </section>
  );
}
