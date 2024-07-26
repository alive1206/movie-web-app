"use client";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type Props = {
  children?: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#1a1a1a] min-h-[calc(100vh-80px-209px)] py-6 px-2">
        {children}
      </div>
      <Footer />
    </div>
  );
};
