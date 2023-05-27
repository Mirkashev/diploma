import { useDeleteData } from "@/hooks/fetching";
import { Icon } from "semantic-ui-react";

export default function DeleteComponent({route, mutateRoute}: any){
  const deleteQ = useDeleteData(route, mutateRoute)
  

  const remove = async ()=> {
    deleteQ.trigger()
  }

  return <Icon style={{cursor:'pointer'}} onClick={remove} name='trash alternate'/>
}