import ChapterTestComponent from "./admin/Component";
import { useGetData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import parsePathName from "@/utils/parsePathname";
import { GET_TOPIC_WITH_RELATIONS } from "@/constants";
import UserTestComponent from "./user/Component";

// todo: refactor garbage component
const ConnectedChapterTest = ()=> {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetData(GET_TOPIC_WITH_RELATIONS + id);

  const pathname = parsePathName(router.pathname, router.query);

  if(isLoading || !id) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  if(router.isReady && !!router.pathname.match('/admin')) {
    return (
      <ChapterTestComponent
        themeId={id+''}
        tests={data?.[0]?.tests}
        pathname={pathname}
      />
    )
  }

  return (
    <UserTestComponent
      tests={data?.[0]?.tests}
      themeId={id+''}
    />
  )


}

export default ConnectedChapterTest;