import { useGetData, patchData, postData, useUpload } from "@/hooks/fetching";
import useToggle from "@/hooks/toggle";
import toBase64 from "@/utils/fileToBase64";
import { useState } from "react";
import InstrumentModalComponent from "./Component";

const ConnectedInstrumentsModal = ({
  method,
  route,
  mutateRoute,
  instrument,
  triggerNode,
}: any) => {
  const [img, setImg]: any = useState(instrument?.url);
  const { value, toggle } = useToggle(false);
  const send =
    method === "POST"
      ? postData(route, mutateRoute)
      : patchData(route, mutateRoute);
  const sendImage = useUpload("/media/upload");

  const submit = async (e: any) => {
    console.log(e.target);
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
      reqBody.url = await (await sendImage.trigger(formFile))?.json();
    }

    reqBody = JSON.stringify(reqBody);

    const res = await send.trigger(reqBody);

    if (res && value) {
      toggle();
    }
  };

  const uploadImage = async (e: any) => {
    if (setImg) {
      const base64Img = await toBase64(e.target.files[0]);
      setImg(base64Img);
    }
  };

  return (
    <InstrumentModalComponent
      title={instrument?.title}
      img={img}
      isOpen={value}
      toggleIsOpen={toggle}
      submit={submit}
      uploadImage={uploadImage}
      triggerNode={triggerNode}
    />
  );
};

export default ConnectedInstrumentsModal;
