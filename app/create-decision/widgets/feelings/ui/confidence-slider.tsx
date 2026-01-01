import { FC, useRef, useState, useEffect } from "react";

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const ConfidenceSlider: FC<ConfidenceSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progress = ((value - min) / (max - min)) * 100;

  const updateValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    const rawValue = min + (percent / 100) * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const newValue = Math.max(min, Math.min(max, steppedValue));

    if (newValue !== value) onChange(newValue);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateValueFromPosition(clientX);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, min, max, step, value, onChange]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updateValueFromPosition(clientX);
  };

  return (
    <div
      className="grid gap-1"
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      ref={trackRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onKeyDown={(e) => {
        if (["ArrowLeft", "ArrowDown"].includes(e.key)) {
          onChange(Math.max(min, value - step));
        } else if (["ArrowRight", "ArrowUp"].includes(e.key)) {
          onChange(Math.min(max, value + step));
        }
      }}
    >
      <div className="relative w-full h-5">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-[#DEE2E6] rounded-md" />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#343A40] rounded-full pointer-events-none"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between">
        <small className="text-sm select-none">Not confident at all</small>
        <small className="text-sm select-none">Very confident</small>
      </div>
    </div>
  );
};
