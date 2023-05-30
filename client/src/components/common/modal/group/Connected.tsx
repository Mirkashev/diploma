import { useState } from "react";
import UserModalComponent from "./Component";
import { useGetData, usePatchDataM, usePostData, useUpload } from "@/hooks/fetching";

const  ConnectedGroupModal = ({method, route, mutateRoute, getRoute, triggerNode}: any)=> {
  const [open, setOpen] = useState(false);
  const [role, setRole]: any = useState('');
  const send = method === 'POST' ? usePostData(route, mutateRoute) : usePatchDataM(route, mutateRoute);

  const { data, isLoading, isError } = useGetData(open ? getRoute : undefined);

  const submit = async (e: any) => {
    e.preventDefault();

    let reqBody: any = {};
    const formData = new FormData(e.target);

    formData.forEach((value:any, key) => {
      reqBody[key] = value;
    } );
    
    reqBody = JSON.stringify(reqBody);
    
    await send.trigger(reqBody);

    setOpen(false);
  }

  return <UserModalComponent
    title={method === 'POST' ? 'Добавить группу' : 'Редактировать группу'}
    open={open}
    setRole={setRole}
    submit={submit}
    setOpen={setOpen}
    triggerNode={triggerNode}
    groupData={data?.[0]}
  />
}

export default  ConnectedGroupModal;