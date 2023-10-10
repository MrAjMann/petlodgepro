"use client";

import { Session } from "@auth/core/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
type Props = {
  children: React.ReactNode;
  session: Session;
};

const queryClient = new QueryClient();
const Provider = ({ children, session }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
export default Provider;
