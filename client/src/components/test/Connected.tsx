import { useGetData } from "@/hooks/fetching";
import TestComponent from "./admin/Component";
import { useRouter } from "next/router";
import UserTestComponent from "./user/";
import { useContext, useEffect } from "react";
import { TitlesContext } from "@/context/titles";

const ConnectedTest = () => {
  const router = useRouter();
  const { test_id } = router.query;

  const { data, isLoading, isError } = useGetData("/tests/" + test_id);

  const { setTopicTitle, setTestTitle } = useContext(TitlesContext);

  useEffect(() => {
    setTestTitle(data?.title);
    setTopicTitle(data?.topic?.title);
  }, [data]);

  if (isLoading || !test_id) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  if (router.isReady && !!router.pathname.match("/admin")) {
    return (
      <TestComponent
        questions={data?.questions}
        title={data?.title || "Шаблонный тайтл теста"}
        mainTitle={data?.topic?.title}
        test_id={+test_id}
      />
    );
  }

  return (
    <UserTestComponent
      questions={data?.questions}
      title={data?.title || "Шаблонный тайтл теста"}
      mainTitle={data?.topic?.title}
    />
  );
};

export default ConnectedTest;
