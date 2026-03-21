"use client";

import { Decision } from "@/shared/types/decision";

import { useDispatch } from "react-redux";
import { resetAll, set } from "@/store/slices/decisions";
import { resetCurrent, setValueByKey } from "@/store/slices/decision";

import data from "./mocks.json";
const DECISIONS = data.decisions as Decision[];

export const DevTools = () => {
  const dispatch = useDispatch();

  const useDevActions = (action: "set" | "reset") => {
    if (action === "set") {
      dispatch(set(DECISIONS));

      dispatch(
        setValueByKey({
          key: "id",
          value: "2a39f8fb-7e5a-45d2-ad4f-b2f991d74ee4",
        }),
      );
      dispatch(
        setValueByKey({
          key: "decision",
          value: "Switch to a Mediterranean-based diet",
        }),
      );
    }

    if (action === "reset") {
      dispatch(resetAll());
      dispatch(resetCurrent());
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
