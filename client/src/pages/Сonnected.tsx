import Page from "@/layouts/page";
import HomeComponent from "./Сomponent";
import { useRouter } from "next/router";

const ConnectedHome = () => {
  const router = useRouter();
  if(router.isReady) router.push('/user/topics');
  return (
    <Page title={'Главная'}>
      <HomeComponent />;
    </Page>
  )
}
export default ConnectedHome;