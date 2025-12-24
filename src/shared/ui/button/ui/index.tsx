interface Button {
  content: string;
  type?: "button" | "submit";
  disabled: boolean;
  onClick?: () => void;
}

export const Button = ({
  content,
  type = "button",
  disabled,
  onClick,
}: Button) => {
  return (
    <button
      className={`w-full px-5 py-4 font-medium rounded-md ${
        disabled
          ? "text-darkgray bg-lightgray hover:cursor-not-allowed"
          : "text-white bg-black hover:cursor-pointer hover:bg-black-hover hover:transition-colors hover:duration-500"
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
