"use client";

import { useRef } from "react";

interface Input {
  type?: "input" | "textarea";
  listed?: boolean;
  inputType?: "text" | "date";
  min?: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({
  type = "input",
  listed = false,
  inputType = "text",
  min,
  id,
  placeholder,
  value,
  onChange,
}: Input) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!listed) return;

    const el = ref.current!;
    const { selectionStart, selectionEnd } = el;

    if (e.key === "Enter") {
      e.preventDefault();

      const before = value.slice(0, selectionStart);
      const after = value.slice(selectionEnd);

      onChange(`${before}\n• ${after}`);

      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = selectionStart + 3;
      });
    }

    if (e.key === "Backspace") {
      const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
      const isBullet = value.slice(lineStart, lineStart + 2) === "• ";

      if (isBullet && selectionStart === lineStart + 2) {
        e.preventDefault();

        const before = value.slice(0, lineStart);
        const after = value.slice(selectionEnd);

        onChange(before + after);

        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = lineStart;
        });
      }
    }
  };

  const handleChange = (content: string) => {
    if (!listed) {
      onChange(content);
      return;
    }

    const lines = content.split("\n");
    onChange(
      lines
        .map((line) =>
          line.startsWith("• ") || line.trim() === "" ? line : "• " + line
        )
        .join("\n")
    );
  };

  return (
    <div className="w-full p-3 bg-white border border-lightgray rounded-md focus-within:border-gray focus-within:transition-colors focus-within:duration-500">
      {type === "input" && (
        <input
          className="w-full outline-none"
          type={inputType}
          id={id}
          placeholder={placeholder}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {type === "textarea" && (
        <textarea
          ref={ref}
          className="w-full h-20 resize-none outline-none"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};
