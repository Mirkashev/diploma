import Page from "@/layouts/page";
import HomeComponent from "./Сomponent";

const ConnectedHome = () => {
  return (
    <Page title={'Главная'}>
      <HomeComponent />;
    </Page>
  )
}
export default ConnectedHome;