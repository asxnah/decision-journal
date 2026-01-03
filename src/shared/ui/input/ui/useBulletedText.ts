import { useCallback, useRef } from "react";

export const useBulletedText = (
  value: string,
  onChange: (val: string) => void,
  bulleted: boolean
) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!bulleted) return;

      const el = ref.current;
      if (!el) return;

      const { selectionStart, selectionEnd } = el;

      // добавление • на Enter
      if (e.key === "Enter") {
        e.preventDefault();
        const before = value.slice(0, selectionStart);
        const after = value.slice(selectionEnd);
        onChange(`${before}\n• ${after}`);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = selectionStart + 3;
        });
      }

      // удаление • на Backspace
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
    },
    [value, onChange, bulleted]
  );

  const handleChange = useCallback(
    (content: string) => {
      if (!bulleted) {
        onChange(content);
        return;
      }

      const lines = content.split("\n");
      onChange(
        lines
          .map((line) =>
            line.startsWith("• ") || line.trim() === "" ? line : `• ${line}`
          )
          .join("\n")
      );
    },
    [onChange, bulleted]
  );

  return { ref, handleKeyDown, handleChange };
};
