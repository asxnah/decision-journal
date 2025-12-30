"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  const [stepNumber, setStepNumber] = useState<1 | 2 | 3>(1);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const { decision, thoughts, options, confidence } = useSelector(
    (state: RootState) => state.decision.data
  );

  useEffect(() => {
    if (stepNumber === 1) {
      setButtonDisabled(decision === "" || thoughts === "");
    }
    if (stepNumber === 2) {
      setButtonDisabled(options === "");
    }
    if (stepNumber === 3) {
      setButtonDisabled(false);
    }
  }, [stepNumber, decision, thoughts, options]);

  const handleNext = () => {
    if (stepNumber === 3) {
      router.push("/expectations");
    } else {
      setStepNumber((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        <Header
          heading="Create Decision"
          icon={
            <ProgressBar
              stepNumber={stepNumber}
              onClick={(number) => {
                if (number < stepNumber) setStepNumber(number);
              }}
            />
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
