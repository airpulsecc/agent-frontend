import { Sidebar } from "@/shared/ui";
import { AppSidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar.Provider>
      <AppSidebar />

      <Sidebar.Inset>
        <Header />

        {children}
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
