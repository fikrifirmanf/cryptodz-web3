import ProjectDescriptionCard from '@/components/Common/ProjectDescriptionCard'
import WalletTransactionCard from '@/components/Common/WalletTransactionCard'
export default function HomeComponent() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ProjectDescriptionCard />
        <WalletTransactionCard />
      </div>
    </div>
  )
}
