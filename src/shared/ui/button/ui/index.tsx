interface ButtonProps {
  content: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  content,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`w-full px-5 py-4 font-medium rounded-md ${
        disabled
          ? "text-darkgray bg-lightgray cursor-not-allowed"
          : "text-white bg-black cursor-pointer hover:bg-black-hover transition-colors duration-500"
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
