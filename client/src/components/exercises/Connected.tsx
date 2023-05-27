import { GET_TOPIC_WITH_RELATIONS } from "@/constants";
import ChapterExComponent from "./Component";
import { useGetData } from "@/hooks/fetching";
import parsePathName from "@/utils/parsePathname";
import { useRouter } from "next/router";


const ConnectChapterEx = ()=> {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetData(GET_TOPIC_WITH_RELATIONS + id);
  const pathname = parsePathName(router.pathname, router.query);

  if(isLoading || !id) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <ChapterExComponent
      exercises={data?.[0]?.exercises}
      themeId={id+""}
      pathname={pathname}
    />
  )
}

export default ConnectChapterEx;