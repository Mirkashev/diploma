import { Icon, Table } from "semantic-ui-react";
import TableHeaderComponent from "../tableHeader";
import TitleModal from "../../modal/titleNew";

const TableHeaderTitleComponent = ({ route, mutateRoute, title }: any) => {
  return (
    <TableHeaderComponent>
      <Table.HeaderCell style={{ padding: 10 }}>
        <span style={{ display: "inline-block", marginRight: "4px" }}>
          {title}
        </span>
        {route ? (
          <TitleModal
            route={route}
            method="POST"
            mutateRoute={mutateRoute}
            triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
          />
        ) : null}
      </Table.HeaderCell>
    </TableHeaderComponent>
  );
};

export default TableHeaderTitleComponent;
