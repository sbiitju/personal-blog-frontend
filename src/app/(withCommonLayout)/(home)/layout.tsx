import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/header";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className=" mx-auto flex-grow mt-24">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default layout;
