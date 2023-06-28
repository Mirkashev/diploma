import { AuthContext } from "@/context/auth";
import { patchData, useGetData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import { useContext } from "react";
import { mutate } from "swr";
import ComponentGroup from "./Component";

const ConnectedGroup = () => {
  const { user }: any = useContext(AuthContext);
  const router = useRouter();

  const { group_id, id } = router.query;

  const { data, isLoading, isError } = useGetData("/groups/" + group_id);

  const removeFromGroup = (el: any) => {
    return async () => {
      const patchUser = patchData("/users/" + el.id, "/groups/" + group_id);
      el.groupId = null;

      await patchUser.trigger(JSON.stringify(el));

      mutate("/users/nogroup");
    };
  };

  const goBack = () => {
    router.push(`/${user?.role}/groups`);
  };

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return (
    <ComponentGroup
      data={data}
      goBack={goBack}
      removeFromGroup={removeFromGroup}
    />
  );
};

export default ConnectedGroup;
