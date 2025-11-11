import { PortfolioBreakdown } from "./portfolio-breakdown"
import { HoldingsList } from "./holdings-list"

export function PortfolioView() {
  return (
    <div className="space-y-6">
      <PortfolioBreakdown />
      <HoldingsList />
    </div>
  )
}
