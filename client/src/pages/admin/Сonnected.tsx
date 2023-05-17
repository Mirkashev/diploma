import Page from "@/layouts/page";
import AdminPanelComponent from "./Сomponent";

const ConnectedAdminPanel = () => {
  // прокинуть пропсы навигации

  return (
    <Page title={'Панель администратора'} isAdmin={true}>
      <AdminPanelComponent />
    </Page>

  )
}
export default ConnectedAdminPanel;