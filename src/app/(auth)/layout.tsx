import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-auto flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
