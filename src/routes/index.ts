import { Container } from "@/features/container";
import { CentredLayout } from "@/layouts/centred-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Container,
});
