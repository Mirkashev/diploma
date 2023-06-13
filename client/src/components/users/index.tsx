import { useGetData } from "@/hooks/fetching";
import UsersTable from "@/components/common/table/users";

export default function UsersComponent() {
  const { data, isLoading, isError } = useGetData("/users/");

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return (
    <>
      <UsersTable array={data} route="/users/" />
    </>
  );
}
