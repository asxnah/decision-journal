"use client";

import { useBulletedText } from "./useBulletedText";

interface InputProps {
  variant?: "input" | "textarea";
  bulleted?: boolean;
  inputType?: React.HTMLInputTypeAttribute;
  min?: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const Input = ({
  variant = "input",
  bulleted = false,
  inputType = "text",
  min,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputProps) => {
  const { ref, handleKeyDown, handleChange } = useBulletedText(
    value,
    onChange,
    bulleted
  );

  return (
    <div className="w-full p-3 bg-white border border-lightgray rounded-md focus-within:border-gray focus-within:transition-colors focus-within:duration-500">
      {variant === "input" && (
        <input
          className="w-full outline-none"
          type={inputType}
          id={id}
          placeholder={placeholder}
          {...(inputType === "date" ? { min } : {})}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {variant === "textarea" && (
        <textarea
          ref={ref}
          className="w-full h-20 resize-none outline-none"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          aria-label={placeholder}
          role="textbox"
          aria-multiline="true"
        />
      )}
    </div>
  );
};
