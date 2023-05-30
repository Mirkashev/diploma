import { useContext } from "react";
import AdminTopicsComponent from "./admin/Сomponent";
import UserTopicsComponent from "./user/Сomponent";

import { useGetData } from "@/hooks/fetching";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";


const ConnectedTopics = () => {
  const {data, isError, isLoading} = useGetData('/themes');
  const router = useRouter();

  if(isLoading) return <div>...Loading</div>

  if(isError) return <div>There is some error, try to update page</div>

  if(!!router?.pathname?.match('/admin')) {
    return (
      <AdminTopicsComponent themes={data}/>
    )
  }

  return(
    <UserTopicsComponent themes={data}/>
  )
}
export default ConnectedTopics;