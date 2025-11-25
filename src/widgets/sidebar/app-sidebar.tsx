import { Brain, CircleUser } from "lucide-react";
import { Sidebar, Text } from "@/shared/ui";
import { LogoMini } from "@/assets/icons";
import { Link, useLocation } from "@tanstack/react-router";

// Menu items.
const items = [
  {
    title: "Profile",
    url: "/profile",
    icon: CircleUser,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar variant="floating" collapsible="icon">
      <Sidebar.Trigger className="absolute end-0 top-[68px] translate-x-1/4 z-100" />
      <Sidebar.Header className="pt-5">
        <Link to="/" className="mx-auto inline-flex gap-2 items-center">
          <LogoMini className="size-8" />
          <Text
            as="span"
            className="group-data-[collapsible=icon]:opacity-0 transition-opacity"
          >
            Munar
          </Text>
        </Link>
      </Sidebar.Header>
      <Sidebar.Content className="mt-5">
        <Sidebar.Group>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {items.map((item) => (
                <Sidebar.MenuItem key={item.title}>
                  <Sidebar.MenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar>
  );
}
