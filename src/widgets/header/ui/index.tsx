import { ReactNode } from "react";

interface Header {
  heading: string;
  icon?: ReactNode;
}

export const Header = ({ heading, icon }: Header) => {
  return (
    <header className="flex justify-between items-center pb-6 mb-6 border-b border-b-lightgray">
      <h1 className="text-2xl font-medium">{heading}</h1>
      {icon}
    </header>
  );
};
