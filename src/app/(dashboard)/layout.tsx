
import Header from "@/components/ui/header/Header";
import { DashboardSidebar } from "@/components/ui/sideNavbar/DashboardSidebar";




export default function Layout({ children }: { children: React.ReactNode }) {


  return (
        <div className="bg-textPrimary text-primary">
          <DashboardSidebar>
            <Header />
            {children}
            </DashboardSidebar>
        </div>
  );
}
