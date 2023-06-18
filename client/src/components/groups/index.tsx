import { Table } from "semantic-ui-react";
import { useGetData } from "@/hooks/fetching";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import TableContainerComponent from "../common/table/tableContainer";
import TableHeaderTitleComponent from "../common/table/tableHeaderTitle";
import TableRowTitleComponent from "../common/table/tableRowTitle";

export default function GroupsComponent() {
  const { user }: any = useContext(AuthContext);
  const { data, isLoading, isError } = useGetData("/groups/");

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return (
    <TableContainerComponent>
      <TableHeaderTitleComponent route="/groups/" title="Список групп:" />
      <Table.Body>
        {data?.map((el: any) => (
          <TableRowTitleComponent
            key={el.id}
            title={el.title}
            route={"/groups/" + el.id}
            mutateRoute={"/groups/"}
            pathname={`/${user?.role}/groups/${el.id}`}
          />
        ))}
      </Table.Body>
    </TableContainerComponent>
  );
}
