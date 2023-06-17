import { TopicsInterface } from "../interfaces";
import TableContainerComponent from "@/components/common/table/tableContainer";
import TableBodyComponent from "@/components/common/table/tableBody";
import TableHeaderTitleComponent from "@/components/common/table/tableHeaderTitle";
import TableRowTitleComponent from "@/components/common/table/tableRowTitle";

const AdminTopicsComponent = ({ topics }: TopicsInterface) => {
  return (
    <TableContainerComponent>
      <TableHeaderTitleComponent
        title={"Список тем:"}
        route={"/topics/"}
        mutateRoute={"/topics/"}
      />
      <TableBodyComponent>
        {topics?.map((el) => (
          <TableRowTitleComponent
            key={el.id}
            route={"/topics/" + el.id}
            mutateRoute={"/topics/"}
            title={el.title}
            pathname={`/admin/topics/${el.id}/theory`}
          />
        ))}
      </TableBodyComponent>
    </TableContainerComponent>
  );
};

export default AdminTopicsComponent;
