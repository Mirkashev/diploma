import { AuthContext } from "@/context/auth";
import { useGetData } from "@/hooks/fetching";
import { useContext } from "react";
import ComponentGroups from "./Component";

const ConnectedGroups = () => {
  const { user }: any = useContext(AuthContext);
  const { data, isLoading, isError } = useGetData("/groups/");

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return <ComponentGroups user={user} groups={data} />;
};

export default ConnectedGroups;
