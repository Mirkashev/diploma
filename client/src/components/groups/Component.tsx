import { Icon, Table } from "semantic-ui-react";
import TableRowTitleComponent from "../common/table/tableRowTitle";
import ComponentCustomTable from "../common/table/customTable";
import TitleModal from "../common/modal/titleNew";

const ComponentGroups = ({ groups, user }: any) => {
  return (
    <ComponentCustomTable
      headerArray={[
        <>
          <span style={{ display: "inline-block", marginRight: "4px" }}>
            Список групп:
          </span>
          <TitleModal
            route={"/groups/"}
            method="POST"
            mutateRoute={"/groups/"}
            triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
          />
        </>,
      ]}
    >
      <Table.Body>
        {groups?.map((el: any) => (
          <TableRowTitleComponent
            key={el.id}
            title={el.title}
            route={"/groups/" + el.id}
            mutateRoute={"/groups/"}
            pathname={`/${user?.role}/groups/${el.id}`}
          />
        ))}
      </Table.Body>
    </ComponentCustomTable>
  );
};

export default ComponentGroups;
