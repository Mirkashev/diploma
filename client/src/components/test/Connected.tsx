import { useGetData } from "@/hooks/fetching";
import TestComponent from "./admin/Component"
import { useRouter } from "next/router";
import UserTestComponent from "./user/";

const ConnectedTest = ()=> {
  const router = useRouter();
  const { test_id } = router.query;

  const { data, isLoading, isError } = useGetData('/tests/' + test_id);

  if(isLoading || !test_id) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  if(router.isReady && !!router.pathname.match('/admin')) {
    return (
      <TestComponent 
        questions={data?.questions} 
        title={data?.title || 'Шаблонный тайтл теста'} 
        mainTitle={data?.theme?.title}
        test_id={+test_id} 
        />
    )
  }

  return (
    <UserTestComponent 
      questions={data?.questions} 
      title={data?.title || 'Шаблонный тайтл теста'} 
      mainTitle={data?.theme?.title}/>
  )
}

export default ConnectedTest;