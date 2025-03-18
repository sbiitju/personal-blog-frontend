"use client";

import UserProvider from "@/context/user.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
