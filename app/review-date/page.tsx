"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";
import { setValueByKey } from "@/store/slices/decision";

import { getTodayISO } from "@lib/getTodayISO";
import { calculatePresetDate } from "./calculatePresetDate";

import { Header } from "@widgets/header";
import { RadioList } from "@ui/list-radio";
import { Input } from "@ui/input";
import { Button } from "@ui/button";

type PresetOption = "In 1 month" | "In 3 months" | "In 6 months";

export default function ReviewDate() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const today = useMemo(() => getTodayISO(), []);

  const { reviewDate, reviewDateType } = useSelector(
    (state: RootState) => state.decision.data,
  );

  const CUSTOM_OPTION = "Custom date";
  const PRESET_OPTIONS: PresetOption[] = [
    "In 1 month",
    "In 3 months",
    "In 6 months",
  ];
  const list = [...PRESET_OPTIONS, CUSTOM_OPTION];
  const isCustom = reviewDateType === "custom";

  const handleRadioChange = (option: string) => {
    if (option === CUSTOM_OPTION) {
      dispatch(setValueByKey({ key: "reviewDateType", value: "custom" }));
      dispatch(setValueByKey({ key: "reviewDate", value: today }));
    } else {
      let dateString = "";

      if (option === "In 1 month") dateString = calculatePresetDate(1);
      if (option === "In 3 months") dateString = calculatePresetDate(3);
      if (option === "In 6 months") dateString = calculatePresetDate(6);

      dispatch(setValueByKey({ key: "reviewDateType", value: "preset" }));
      dispatch(setValueByKey({ key: "reviewDate", value: dateString }));
    }
  };

  const selectedOption = useMemo(() => {
    if (reviewDateType === "custom") return CUSTOM_OPTION;

    if (reviewDate === calculatePresetDate(1)) return "In 1 month";
    if (reviewDate === calculatePresetDate(3)) return "In 3 months";
    if (reviewDate === calculatePresetDate(6)) return "In 6 months";

    return "";
  }, [reviewDate, reviewDateType, today]);

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
                  dispatch(setValueByKey({ key: "reviewDate", value }))
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
          dispatch(setValueByKey({ key: "createdAt", value: today }));
          router.push("/decision-detail");
        }}
        disabled={reviewDate.trim() === ""}
      />
    </section>
  );
}
