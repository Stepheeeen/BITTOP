import { DashboardHeader } from "@/components/dashboard/header"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { MarketHighlights } from "@/components/dashboard/market-highlights"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

export default function Home() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <QuickStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PortfolioOverview />
        <MarketHighlights />
      </div>
      <RecentTransactions />
    </div>
  )
}
