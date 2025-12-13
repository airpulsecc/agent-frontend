import { ProfileContainer } from "@/features/profile/container";
import { CentredLayout } from "@/layouts/centred-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: () => (
    <CentredLayout>
      <ProfileContainer />
    </CentredLayout>
  ),
});
