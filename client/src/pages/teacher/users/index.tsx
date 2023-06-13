import Page from "@/layouts/page";
import UsersView from "@/views/users";

export default function UsersPage() {
  return (
    <Page title={"Редактировать пользователей"}>
      <UsersView />
    </Page>
  );
}
