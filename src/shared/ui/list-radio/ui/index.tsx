"use client";

import { RadioIcon } from "./icons/radio";

interface RadioListProps {
  list: string[];
  name: string;
  value: string;
  onChange: (data: string) => void;
}

export const RadioList = ({ list, name, value, onChange }: RadioListProps) => {
  return (
    <ul className="grid gap-3">
      {list.map((li) => {
        const meta = li.toLocaleLowerCase().replaceAll(" ", "-");
        const isChecked = value === li;
        return (
          <li key={li} className="flex gap-1.5 items-end">
            <div className="w-4.5 h-4.5 relative">
              <input
                className="w-full h-full opacity-0 absolute z-1 cursor-pointer"
                type="radio"
                name={name}
                id={meta}
                value={li}
                checked={isChecked}
                onChange={() => onChange(li)}
              />
              <RadioIcon checked={isChecked} />
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
