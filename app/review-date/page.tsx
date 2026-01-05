"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";
import { set } from "@/store/slices/decision";

import { getTodayISO } from "@lib/getTodayISO";

import { Header } from "@widgets/header";
import { RadioList } from "@ui/list-radio";
import { Input } from "@ui/input";
import { Button } from "@ui/button";

export default function ReviewDate() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const today = useMemo(() => getTodayISO(), []);

  const CUSTOM_OPTION = "Custom date";
  const { reviewDate, reviewDateType } = useSelector(
    (state: RootState) => state.decision.data
  );
  const list = ["In 1 month", "In 3 months", "In 6 months", CUSTOM_OPTION];
  const isCustom = reviewDateType === "custom";

  const handleRadioChange = (option: string) => {
    if (option === CUSTOM_OPTION) {
      dispatch(set({ key: "reviewDateType", value: "custom" }));
      dispatch(set({ key: "reviewDate", value: today }));
    } else {
      dispatch(set({ key: "reviewDateType", value: "preset" }));
      dispatch(set({ key: "reviewDate", value: option }));
    }
  };

  const selectedOption = useMemo(() => {
    if (reviewDateType === "custom") {
      return CUSTOM_OPTION;
    }
    if (list.includes(reviewDate)) {
      return reviewDate;
    }
    return "";
  }, [reviewDate, reviewDateType]);

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        <Header heading="Review date" />
        <section className="grid gap-5">
          <h2 className="text-3xl font-semibold whitespace-pre-line">
            When should you
            {"\n"}
            revisit this decision?
          </h2>
          <p>Choose a moment when the outcome will be clearer.</p>
          <div className="grid gap-3">
            <RadioList
              list={list}
              name="review-date"
              value={selectedOption}
              onChange={handleRadioChange}
            />
            {isCustom && (
              <Input
                id="review-date-custom"
                placeholder="12.03.2025"
                min={today}
                inputType="date"
                value={reviewDate}
                onChange={(value) =>
                  dispatch(set({ key: "reviewDate", value }))
                }
                aria-describedby="reviewDate-help"
              />
            )}
          </div>
          <small className="text-sm text-darkgray" id="reviewDate-help">
            This will unlock the reflection step later.
          </small>
        </section>
      </div>

      <Button
        content="Next"
        onClick={() => {
          dispatch(set({ key: "createdAt", value: today }));
          router.push("/decision-detail");
        }}
        disabled={reviewDate === ""}
      />
    </section>
  );
}
