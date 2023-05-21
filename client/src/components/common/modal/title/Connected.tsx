import { useState } from "react";
import AddModal from "./Component";
import { usePostData } from "@/hooks/fetching";

const ConnectedAddModal = ({title, id, route, mutate}: any) => {
  const [open, setOpen] = useState(false);
  const { trigger, isMutating, error} = usePostData(route);

  const submit = async (e: any)=> {
    e.preventDefault();

    let reqBody: any = {};
    const formData = new FormData(e.target)
    formData.forEach((value, key) => reqBody[key] = value);
    reqBody = id ? JSON.stringify({...reqBody, themeId: id}) : JSON.stringify(reqBody);
  
    trigger(reqBody);

    if(!isMutating && !error) {
      mutate ? mutate() : null;
      setOpen(false);
    }
  }

  return(
    <AddModal
      title={title}
      submit={submit}
      open={open}
      setOpen={setOpen}
    />
  )
}

export default ConnectedAddModal;