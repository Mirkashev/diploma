import { useDeleteData, useGetData } from "@/hooks/fetching";
import TestComponent from "./admin/Component"
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserTestComponent from "./user/Component";

const ConnectedTest = ()=> {
  const router = useRouter();
  const { test_id } = router.query;

  const { data, isLoading, isError } = useGetData('/tests/getone/' + test_id);

  if(isLoading || !test_id) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  if(router.isReady && !!router.pathname.match('/admin')) {
    return (
      <TestComponent questions={data?.[0]?.questions} test_id={+test_id} title={data?.[0]?.title || 'Шаблонный тайтл теста'}/>
    )
  }

  return (
    <UserTestComponent questions={data?.[0]?.questions} test_id={+test_id} title={data?.[0]?.title || 'Шаблонный тайтл теста'}/>
  )
}

export default ConnectedTest;