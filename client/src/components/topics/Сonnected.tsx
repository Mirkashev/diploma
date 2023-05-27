import { useContext } from "react";
import TopicsComponent from "./Сomponent";
import { useGetData } from "@/hooks/fetching";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";


const ConnectedTopics = () => {
  const {data, isError, isLoading} = useGetData('/themes');
  const {user}: any = useContext(AuthContext);
  const router = useRouter();

  if(isLoading) return <div>...Loading</div>

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <TopicsComponent themes={data} isAdmin={user?.role === 'admin' && router.pathname === '/admin/topics'}/>
  )
}
export default ConnectedTopics;