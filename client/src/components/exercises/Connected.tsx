import { GET_TOPIC_WITH_RELATIONS } from "@/constants";
import ChapterExComponent from "./admin/Component";
import { useGetData } from "@/hooks/fetching";
import parsePathName from "@/utils/parsePathname";
import { useRouter } from "next/router";
import UserExComponent from "./user/Component";
import { useContext, useEffect } from "react";
import { TitlesContext } from "@/context/titles";

const ConnectChapterEx = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetData("/topics/" + id);
  const pathname = parsePathName(router.pathname, router.query);

  const { setTopicTitle } = useContext(TitlesContext);

  useEffect(() => {
    setTopicTitle(data?.title);
  }, [data]);

  if (isLoading || !id) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return (
    <>
      {router.isReady && router.pathname.match("/admin") ? (
        <ChapterExComponent
          exercises={data?.exercises}
          themeId={id + ""}
          title={data?.title}
        />
      ) : (
        <UserExComponent
          exercises={data?.exercises}
          pathname={pathname || ""}
          title={data?.title}
        />
      )}
    </>
  );
};

export default ConnectChapterEx;
