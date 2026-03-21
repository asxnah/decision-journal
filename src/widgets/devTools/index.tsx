"use client";

import { Decision } from "@/shared/types/decision";

import { reset as resetAll, set as setAll } from "@/store/slices/decisions";
import { reset, set } from "@/store/slices/decision";
import { useDispatch } from "react-redux";

import { data } from "./mocks.json";
const DECISIONS = data as Decision[];

export const DevTools = () => {
  const dispatch = useDispatch();

  const useDevActions = (action: "set" | "reset") => {
    if (action === "set") {
      dispatch(setAll(DECISIONS));

      dispatch(
        set({ key: "id", value: "2a39f8fb-7e5a-45d2-ad4f-b2f991d74ee4" }),
      );
      dispatch(set({ key: "reviewed", value: false }));
      dispatch(set({ key: "successful", value: null }));
      dispatch(
        set({ key: "decision", value: "Switch to a Mediterranean-based diet" }),
      );
      dispatch(
        set({
          key: "thoughts",
          value: "Focused on improving long-term health and daily energy.",
        }),
      );
      dispatch(
        set({
          key: "options",
          value:
            "• Follow strict plan\n• Replace snacks\n• Use delivery service",
        }),
      );
      dispatch(set({ key: "confidence", value: 78 }));
      dispatch(
        set({
          key: "expectations",
          value: "Better focus and physical health markers.",
        }),
      );
      dispatch(set({ key: "reviewDateType", value: "custom" }));
      dispatch(set({ key: "reviewDate", value: "2026-02-28" }));
      dispatch(set({ key: "createdAt", value: "2026-01-07" }));
    }

    if (action === "reset") {
      dispatch(resetAll());
      dispatch(reset());
    }

    location.reload();
  };

  return (
    <div className="absolute z-99 top-4 right-4 flex flex-col gap-2 px-4 py-3 border border border-lightgray rounded-md bg-white">
      <button className="self-start" onClick={() => useDevActions("set")}>
        <span className="text-darkgray">[DEV]</span> FILL MOCK DATA &gt;&gt;
      </button>
      <button className="self-start" onClick={() => useDevActions("reset")}>
        <span className="text-darkgray">[DEV]</span> CLEAR MOCK DATA &gt;&gt;
      </button>
    </div>
  );
};
