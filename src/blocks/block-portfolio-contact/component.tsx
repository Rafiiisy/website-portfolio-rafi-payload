import { PortfolioContactSection } from "@/components/portfolio/sections";

export function BlockPortfolioContact({ data }: { data: Record<string, unknown> }) {
  return <PortfolioContactSection data={data} />;
}
