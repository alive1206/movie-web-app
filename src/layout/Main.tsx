"use client";

import { Navbar } from "./Navbar";

type Props = {
  children?: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
