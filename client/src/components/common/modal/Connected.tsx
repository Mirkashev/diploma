import { useState } from "react";
import AddByTitle from "./title/Component";
import { useGetData, usePatchDataM,  usePostData, useUpload } from "@/hooks/fetching";
import QuestionModal from "./question/Component";
import InstrumentModal from "./instrument/Component";

// TODO: переписать полностью эту помойку
const ConnectedModal = ({title, route, getRoute, mutateRoute, method, modalType, triggerNode}: any) => {
  const [open, setOpen] = useState(false);
  const send = method === 'POST' ? usePostData(route, mutateRoute) : usePatchDataM(route, mutateRoute);
  const uploadImage = useUpload('/media/upload');
  const { data, isLoading, isError } = useGetData(open ? getRoute : undefined);
  console.log(data);
  // TODO: REFACTOR
  const submit = async (e: any)=> {
    e.preventDefault();

    let reqBody: any = {};
    const formData = new FormData(e.target)
    formData.forEach((value, key) => reqBody[key] = value);
    // todo: remove id
    reqBody = JSON.stringify(reqBody);

    console.log(reqBody);
  
    const res = await send.trigger(reqBody);

    if(res) {
      setOpen(false);
    }

  }

  if(modalType === 'question') {
    const submit = async  (e: any)=>{
      e.preventDefault();
  
      let reqBody: any = {
        answers: []
      };

      const formData = new FormData(e.target);

      let counter = 0;

      formData.forEach((value, key) => {
        if(key === 'answer') {
          reqBody['answers'] = [...reqBody['answers'], {title: value, isTrue: false}];
          counter+=1;
        }
  
        if(key === 'answer-true') {
          reqBody['answers'][counter - 1] = {
            ...reqBody['answers'][counter - 1],
            isTrue: !!value,
          };
        }
  
        if(key !== 'answer' && key !== 'answer-true') {
          reqBody[key] = value;
        }
      });

      reqBody = JSON.stringify(reqBody);
  
      const res = await send.trigger(reqBody);

      if(res) {
        setOpen(false);
      }
    }
    return(
      <QuestionModal
        question={data}
        title={title}
        submit={submit}
        open={open}
        setOpen={setOpen}
        triggerNode={triggerNode}
      />
    )
  }

  if(modalType === 'instrument') {
    const submit = async (e: any) => {
      console.log(e.target);
      let reqBody: any = {};
      const formData = new FormData(e.target);
      const formFile: any = new FormData();
      let isFile = false;

      formData.forEach((value:any, key) => {
        console.log(key, value?.size);
        if(key === 'file') {
          formFile.append('file', value);
          if(value?.size > 0) {
            isFile = true;
          }

        }else {
          reqBody[key] = value;
        }
      } );
      
      // at first send img
      if(isFile) {
        reqBody.url = await (await uploadImage.trigger(formFile))?.json();
      }

      reqBody = JSON.stringify(reqBody);
      
      await send.trigger(reqBody);

      setOpen(false);
      console.log(reqBody);
    }
    return(
      <InstrumentModal
        title={method === 'POST' ? 'Добавить инструмет' : 'Редактировать инструмент'}
        open={open}
        submit={submit}
        setOpen={setOpen}
        triggerNode={triggerNode}
        instrumentData={data}
      />
    )
  }

  return(
    <AddByTitle
      title={title}
      submit={submit}
      open={open}
      setOpen={setOpen}
      triggerNode={triggerNode}
    />
  )


}

export default ConnectedModal;