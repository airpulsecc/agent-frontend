import { RecentContainer } from "@/features/recent/container";
import { DefaultLayout } from "@/layouts/default-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recent")({
  component: () => {
    return (
      <DefaultLayout>
        <RecentContainer />
      </DefaultLayout>
    );
  },
});
