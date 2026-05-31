import { PortfolioProjectsSection } from "@/components/portfolio/projects-section";

export function BlockPortfolioProjects({ data }: { data: Record<string, unknown> }) {
  return <PortfolioProjectsSection data={data} />;
}
