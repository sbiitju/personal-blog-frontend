import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className=" mx-auto flex-grow mt-24">{children}</div>
    </div>
  );
};

export default layout;
