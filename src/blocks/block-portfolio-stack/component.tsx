import { PortfolioStackSection } from "@/components/portfolio/sections";

export function BlockPortfolioStack({ data }: { data: Record<string, unknown> }) {
  return <PortfolioStackSection data={data} />;
}
