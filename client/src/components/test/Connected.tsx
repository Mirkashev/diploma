import { useDeleteData, useGetData } from "@/hooks/fetching";
import TestComponent from "./Component"
import { useRouter } from "next/router";
import { useEffect } from "react";

const ConnectedTest = ()=> {
  const router = useRouter();
  const { test_id } = router.query;

  const { data, isLoading, isError } = useGetData('/tests/getone/' + test_id);

  if(isLoading || !test_id) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <TestComponent questions={data?.[0]?.questions} test_id={+test_id} title={data?.[0]?.title || 'Шаблонный тайтл теста'}/>
  )
}

export default ConnectedTest;