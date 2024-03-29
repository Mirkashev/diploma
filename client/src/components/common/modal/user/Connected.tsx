import { useState } from "react";
import UserModalComponent from "./Component";
import { useGetData, patchData, postData, useUpload } from "@/hooks/fetching";

const ConnectedUserModal = ({
  method,
  route,
  mutateRoute,
  getRoute,
  triggerNode,
}: any) => {
  const [open, setOpen] = useState(false);
  const [role, setRole]: any = useState("");
  const send =
    method === "POST"
      ? postData(route, mutateRoute)
      : patchData(route, mutateRoute);
  const uploadImage = useUpload("/media/upload");
  const { data, isLoading, isError } = useGetData(open ? getRoute : undefined);

  const submit = async (e: any) => {
    e.preventDefault();

    let reqBody: any = {};
    const formData = new FormData(e.target);
    const formFile: any = new FormData();
    let isFile = false;

    formData.forEach((value: any, key) => {
      console.log(key, value?.size);
      if (key === "file") {
        formFile.append("file", value);
        if (value?.size > 0) {
          isFile = true;
        }
      } else {
        reqBody[key] = value;
      }
    });

    if (isFile) {
      reqBody.url = await (await uploadImage.trigger(formFile))?.json();
    }

    reqBody.role = role || "student";

    reqBody = JSON.stringify(reqBody);

    await send.trigger(reqBody);

    setOpen(false);
  };

  return (
    <UserModalComponent
      title={
        method === "POST"
          ? "Добавить пользователя"
          : "Редактировать пользователя"
      }
      open={open}
      setRole={setRole}
      submit={submit}
      setOpen={setOpen}
      triggerNode={triggerNode}
      userData={data?.[0]}
    />
  );
};

export default ConnectedUserModal;
