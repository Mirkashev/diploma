import { useState, useEffect, useContext } from "react";
import ChapterTheoryComponent from "./admin/Component";
import { useGetData, usePatchDataM, usePostData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";
import UserTheoryComponent from "./user/Component";

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

  if(!!router?.pathname?.match('/admin')) {
    return (
      <ChapterTheoryComponent 
        sendTheory={sendTheory}
        content={data?.[0]?.theory?.content}
        setData={setContent}
      />
    )
  }

  return <UserTheoryComponent
    content={data?.[0]?.theory?.content || '<div>...loading</div>'}
  />
}

export default ConnectedChapterTheory;