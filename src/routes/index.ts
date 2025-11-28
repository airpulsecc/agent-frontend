import { Container } from "@/features/landing/container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Container,
});
