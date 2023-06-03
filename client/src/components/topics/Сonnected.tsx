import AdminTopicsComponent from "./admin/Сomponent";
import UserTopicsComponent from "./user/Сomponent";

import { useGetData } from "@/hooks/fetching";
import { useRouter } from "next/router";


const ConnectedTopics = () => {
  const {data, isError, isLoading} = useGetData('/topics/');
  const router = useRouter();

  if(isLoading) return <div>...Loading</div>

  if(isError) return <div>There is some error, try to update page</div>

  if(!!router?.pathname?.match('/admin')) {
    return (
      <AdminTopicsComponent topics={data}/>
    )
  }

  return(
    <UserTopicsComponent topics={data}/>
  )
}
export default ConnectedTopics;