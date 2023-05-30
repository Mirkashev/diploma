import { useRouter } from "next/router";
import MenuTopics from "./components/TopicsMenu";
import MenuUsers from "./components/UsersMenu";

const ConnectedLNavMenu = ({pageType}: any)=> {
  const router = useRouter();
  const { id } = router?.query;

  if(pageType === 'adminUsers') {
    const handlePage = (e: any)=> {
      router.push('/admin/users/' + e.target.type);
    }

    return(
      <MenuUsers handlePage={handlePage} pathname={router?.pathname}/>
    )
  }

  if(router.isReady && router.pathname.match('/user')) {
    const handlePage = (e: any)=> {
      router.push('/user/topics/' + id + '/' + e.target.type);
    }
  
    return(
      <MenuTopics handlePage={handlePage} pathname={router?.pathname}/>
    )
  }

  const handlePage = (e: any)=> {
    router.push('/admin/topics/' + id + '/' + e.target.type);
  }

  return(
    <MenuTopics handlePage={handlePage} pathname={router?.pathname}/>
  )
}

export default ConnectedLNavMenu;