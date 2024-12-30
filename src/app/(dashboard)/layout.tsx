"use client";

import { DashboardSidebar } from "@/components/ui/sideNavbar/DashboardSidebar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  
  return (
      <QueryClientProvider client={queryClient}>
        <div className="bg-textPrimary text-primary">
          <DashboardSidebar>{children}</DashboardSidebar>
        </div>
      </QueryClientProvider>
  );
}
