"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";
import { set } from "@/store/slices/decision";

import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Header } from "@widgets/header";

export default function Expectations() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { expectations } = useSelector(
    (state: RootState) => state.decision.data
  );
  const [localExpectations, setLocalExpectations] = useState(expectations);

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        <Header heading="Expectations" />
        <section className="grid gap-5">
          <h2 className="text-3xl font-semibold">
            What do you
            <br />
            expect to happen?
          </h2>
          <p>
            Describe what you believe will change as a result of this decision.
          </p>
          <div className="grid gap-2.5">
            <Input
              type="textarea"
              id="expectations"
              placeholder="I expect to feel more motivated and grow faster in a new role"
              value={localExpectations}
              onChange={setLocalExpectations}
              onBlur={() =>
                dispatch(set({ key: "expectations", value: localExpectations }))
              }
            />
            <small className="text-sm text-darkgray">
              This will be used later to reflect on your decision.
            </small>
          </div>
        </section>
      </div>

      <Button
        content="Next"
        onClick={() => router.push("/review-date")}
        disabled={expectations === ""}
      />
    </section>
  );
}
