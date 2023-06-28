import { useGetData } from "@/hooks/fetching";
import ComponentUsers from "./Component";

const ConnectedUsers = () => {
  const { data, isLoading, isError } = useGetData("/users/");

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return <ComponentUsers data={data} />;
};

export default ConnectedUsers;
