import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar-admin";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <main className="">
        <SidebarTrigger  />
        <div className="px-12 mx-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
