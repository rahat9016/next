"use client";

import { DashboardSidebar } from "@/components/ui/sideNavbar/DashboardSidebar";
import store from "@/redux/Store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-textPrimary text-primary">
          <DashboardSidebar>{children}</DashboardSidebar>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}
