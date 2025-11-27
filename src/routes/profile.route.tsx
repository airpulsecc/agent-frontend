import { ProfileContainer } from "@/features/profile/container";
import { CentredLayout } from "@/layouts/centred-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: () => (
    <CentredLayout>
      <ProfileContainer />
    </CentredLayout>
  ),
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
