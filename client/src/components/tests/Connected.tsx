import ChapterTestComponent from "./admin/Component";
import { useGetData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import UserTestComponent from "./user/Component";
import { useContext, useEffect } from "react";
import { TitlesContext } from "@/context/titles";

// todo: refactor garbage component
const ConnectedChapterTest = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetData("/topics/" + id);

  const { setTopicTitle } = useContext(TitlesContext);

  useEffect(() => {
    setTopicTitle(data?.title);
  }, [data]);

  if (isLoading || !id) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  if (router.isReady && !!router.pathname.match("/admin")) {
    return (
      <ChapterTestComponent
        themeId={id + ""}
        tests={data?.tests}
        title={data?.title}
      />
    );
  }

  return (
    <UserTestComponent
      tests={data?.tests}
      themeId={id + ""}
      title={data?.title}
    />
  );
};

export default ConnectedChapterTest;
