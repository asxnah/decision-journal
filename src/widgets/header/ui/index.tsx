import { ReactNode } from "react";

interface HeaderProps {
  heading: string;
  icon?: ReactNode;
}

export const Header = ({ heading, icon }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center pb-6 mb-6 border-b border-b-lightgray">
      <h1 className="text-2xl font-medium">{heading}</h1>
      {icon}
    </header>
  );
};
