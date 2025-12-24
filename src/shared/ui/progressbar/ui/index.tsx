interface ProgressBar {
  stepNumber: 1 | 2 | 3;
  onClick: (stepNumber: 1 | 2 | 3) => void;
}

export const ProgressBar = ({ stepNumber, onClick }: ProgressBar) => {
  return (
    <svg
      width="76"
      height="12"
      viewBox="0 0 76 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="transition-colors duration-500 cursor-pointer"
        cx="6"
        cy="6"
        r="6"
        fill={stepNumber === 1 ? "#343A40" : "#CED4DA"}
        onClick={() => onClick(1)}
      />
      <rect x="14" y="5" width="16" height="2" rx="1" fill="#CED4DA" />
      <circle
        className="transition-colors duration-500 cursor-pointer"
        cx="38"
        cy="6"
        r="6"
        fill={stepNumber === 2 ? "#343A40" : "#CED4DA"}
        onClick={() => onClick(2)}
      />
      <rect x="46" y="5" width="16" height="2" rx="1" fill="#CED4DA" />
      <circle
        className="transition-colors duration-500 cursor-pointer"
        cx="70"
        cy="6"
        r="6"
        fill={stepNumber === 3 ? "#343A40" : "#CED4DA"}
        onClick={() => onClick(3)}
      />
    </svg>
  );
};
