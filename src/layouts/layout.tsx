import { Sidebar } from "@/shared/ui";
import { AppSidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar.Provider>
      <AppSidebar />

      <Sidebar.Inset>
        <Header />

        <div className="flex grow flex-col items-center justify-center">
          {children}
        </div>
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
