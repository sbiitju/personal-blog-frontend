import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarPolitical } from "@/components/app-sidebar-political";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarPolitical />
      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="flex items-center gap-2 p-4 border-b bg-white">
          <SidebarTrigger />
          <div className="h-6 w-px bg-gray-300" />
          <span className="text-sm text-gray-600 font-bengali-medium">রাজনৈতিক প্যানেল</span>
        </div>
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
