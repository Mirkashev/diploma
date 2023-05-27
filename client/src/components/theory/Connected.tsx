import { useState, useEffect } from "react";
import ChapterTheoryComponent from "./Component";
import { useGetData, usePatchDataM, usePostData } from "@/hooks/fetching";
import { useRouter } from "next/router";

const ConnectedChapterTheory = ()=> {
  const router = useRouter();
  const { id }: any = router.query;

  const { data, isError, isLoading } = useGetData('/themes/getone/'+id);

  const post = usePostData('/theories/'+id, '/themes/getone/'+id);
  const patch = usePatchDataM('/theories/'+id, '/themes/getone/'+id);

  const [content, setContent] = useState('');

  const sendTheory = ()=> {
    const sendingData: any = JSON.stringify({content: content});

    if(!!data?.[0]?.theory?.content) {
      patch.trigger(sendingData);
      return;
    }

    post.trigger(sendingData);
  }

  useEffect(()=> {
    if(data) {
      setContent(data?.[0]?.content);
    }
  }, [data])


  if(isLoading || !id) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <ChapterTheoryComponent 
      sendTheory={sendTheory}
      content={data?.[0]?.theory?.content}
      setData={setContent}
    />
  )
}

export default ConnectedChapterTheory;