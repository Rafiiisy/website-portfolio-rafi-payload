import { PortfolioHeroSection } from "@/components/portfolio/sections";

export function BlockPortfolioHero({ data }: { data: Record<string, unknown> }) {
  return <PortfolioHeroSection data={data} />;
}
