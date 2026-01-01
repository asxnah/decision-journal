"use client";

import { useState } from "react";
import { RadioIcon } from "./icons/radio";

interface List {
  list: string[];
  name: string;
  onChange: (data: string) => void;
}

export const RadioList = ({ list, name, onChange }: List) => {
  const [item, setItem] = useState("");

  const handleChange = (li: string) => {
    setItem(li);
    onChange(li);
  };

  return (
    <ul className="grid gap-3">
      {list.map((li) => {
        const meta = li.toLocaleLowerCase().replaceAll(" ", "-");
        return (
          <li key={li} className="flex gap-1.5 items-end">
            <div className="w-4.5 h-4.5 relative">
              <input
                className="w-full h-full opacity-0 absolute z-1 cursor-pointer"
                type="radio"
                name={name}
                id={meta}
                onChange={() => handleChange(li)}
              />
              <RadioIcon checked={item === li} />
            </div>
            <label className="cursor-pointer" htmlFor={meta}>
              {li}
            </label>
          </li>
        );
      })}
    </ul>
  );
};
