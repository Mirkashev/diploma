import AdminThemeComponent from "./Сomponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetData } from "@/hooks/fetching";

const ConnectedAdminTheme= () => {
  const router = useRouter();
  // todo: fix bug with no id request
  const { id } = router.query;
  console.log('/themes/'+id);
  const {data, isError, isLoading, mutate} = useGetData('/themes/'+id);

  const [chapter, handleChapter] = useState('theory');

  if(isLoading || !id) return <div>...Loading</div>

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <AdminThemeComponent 
      theme={data?.[0]} 
      chapter={chapter} 
      handleChapter={handleChapter}
      mutate={mutate}
    />
  )
}
export default ConnectedAdminTheme;