import Page from "@/layouts/page";
import AdminStatsComponent from "./Сomponent";

const ConnectedAdminStats = () => {
  return (
    <Page title={'Статистика'} isAdmin={true}>
      <AdminStatsComponent/>
    </Page>

  )
}
export default ConnectedAdminStats;