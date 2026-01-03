import { useEffect, useState } from "react";
import { CheckboxIcon } from "./icons/checkbox";

interface List {
  list: string[];
  name: string;
  onChange: (list: string[]) => void;
}

export const CheckboxList = ({ list, name, onChange }: List) => {
  const [checkList, setCheckList] = useState<string[]>([]);

  const handleListChange = (checked: boolean, value: string) => {
    setCheckList((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    onChange(checkList);
  }, [checkList, onChange]);

  return (
    <ul className="grid gap-3">
      {list.map((li) => {
        const meta = li.toLocaleLowerCase().replaceAll(" ", "-");
        return (
          <li key={li} className="flex gap-1.5">
            <div className="w-4.5 h-4.5 relative">
              <input
                className="w-full h-full opacity-0 absolute z-1 cursor-pointer"
                type="checkbox"
                name={name}
                id={meta}
                onChange={(e) => handleListChange(e.target.checked, li)}
              />
              <CheckboxIcon checked={checkList.includes(li)} />
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
