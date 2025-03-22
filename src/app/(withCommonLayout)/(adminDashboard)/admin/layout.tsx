import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar-admin";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <main className="w-full">
        <SidebarTrigger />
        <div className="px-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}
