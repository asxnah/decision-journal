interface CheckboxIcon {
  checked: boolean;
}

export const CheckboxIcon = ({ checked }: CheckboxIcon) => {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="17"
          height="17"
          rx="3.5"
          fill={checked ? "#6C757D" : "white"}
        />
        <rect
          x="0.5"
          y="0.5"
          width="17"
          height="17"
          rx="3.5"
          stroke="#6C757D"
        />
        {checked && (
          <path
            d="M4 9.20833L6.91686 12.4493C7.34457 12.9245 8.10226 12.8818 8.47389 12.3616L14 4.625"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        )}
      </svg>
    </>
  );
};
