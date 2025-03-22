import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarPolitical } from "@/components/app-sidebar-political";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarPolitical />
      <main className="">
        <SidebarTrigger />
        <div className="px-12 mx-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
