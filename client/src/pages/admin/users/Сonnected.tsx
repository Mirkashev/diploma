import Page from "@/layouts/page";
import AdminUsersComponent from "./Сomponent";

const ConnectedAdminUsers = () => {
  return (
    <Page title={'Редактировать пользователей'} isAdmin={true}>
      <AdminUsersComponent />
    </Page>

  )
}
export default ConnectedAdminUsers;