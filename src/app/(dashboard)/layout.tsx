import { DashboardSidebar } from "@/components/ui/sideNavbar/DashboardSidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-textPrimary text-primary">
      <DashboardSidebar>
        {children}
      </DashboardSidebar>
    </div>
  );
}