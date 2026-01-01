interface RadioIcon {
  checked: boolean;
}

export const RadioIcon = ({ checked }: RadioIcon) => {
  return (
    <svg
      className="absolute"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" fill="white" />
      <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#6C757D" />
      {checked && <circle cx="9" cy="9" r="5" fill="#6C757D" />}
    </svg>
  );
};
