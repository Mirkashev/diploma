import { useState, useEffect, useContext } from "react";
import ChapterTheoryComponent from "./admin/Component";
import { useGetData, usePatchDataM, usePostData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import UserTheoryComponent from "./user/Component";

const ConnectedChapterTheory = ()=> {
  const router = useRouter();
  const { id }: any = router.query;

  const { data, isError, isLoading } = useGetData('/topics/'+id);

  const post = usePostData('/theories/'+id);
  const patch = usePatchDataM('/theories/'+id);

  const [content, setContent] = useState('');

  const setData = (data: string) => setContent(data);

  const sendTheory = async ()=> {
    const sendingData: any = JSON.stringify({content: content});

    const resp = data?.theory?.content ? await patch.trigger(sendingData) : await post.trigger(sendingData);

    alert(resp);
  }

  if(isLoading || !id) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  if(!!router?.pathname?.match('/admin')) {
    return (
      <ChapterTheoryComponent 
        sendTheory={sendTheory}
        content={data?.theory?.content || ''}
        setData={setData}
        title={data?.title}
      />
    )
  }

  return <UserTheoryComponent
    content={data?.theory?.content || '<div>...loading</div>'}
    title={data?.title}
  />
}

export default ConnectedChapterTheory;