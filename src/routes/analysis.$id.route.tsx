import { createFileRoute, redirect } from "@tanstack/react-router";
import { DefaultLayout } from "@/layouts/default-layout";
import { Container } from "@/features/analysis/container";

export const Route = createFileRoute("/analysis/$id")({
  component: AnalysisPage,
  beforeLoad: ({ params }) => {
    if (!params.id) throw redirect({ to: "/" });
  },
});

function AnalysisPage() {
  const { id } = Route.useParams();

  return (
    <DefaultLayout>
      <Container eventId={id} />
    </DefaultLayout>
  );
}
