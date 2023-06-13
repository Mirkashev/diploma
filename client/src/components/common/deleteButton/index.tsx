import { deleteData } from "@/hooks/fetching";
import { Icon } from "semantic-ui-react";

export default function DeleteComponent({ route, mutateRoute }: any) {
  const deleteQ = deleteData(route, mutateRoute);

  const remove = async () => {
    console.log("here");
    deleteQ.trigger();
  };

  return (
    <Icon
      style={{ cursor: "pointer" }}
      onClick={remove}
      name="trash alternate"
    />
  );
}
