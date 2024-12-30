"use client";

import { DashboardSidebar } from "@/components/ui/sideNavbar/DashboardSidebar";
import { useAppSelector } from "@/lib/redux/hooks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const auth = useAppSelector(state => state.auth)

  return (
      <QueryClientProvider client={queryClient}>
        <div className="bg-textPrimary text-primary">
          <DashboardSidebar>{children}</DashboardSidebar>
        </div>
      </QueryClientProvider>
  );
}
