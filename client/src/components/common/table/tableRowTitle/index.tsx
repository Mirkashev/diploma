import Link from "next/link";
import { Icon, Table } from "semantic-ui-react";
import TitleModal from "../../modal/titleNew";
import DeleteComponent from "../../deleteButton";

const TableRowTitleComponent = ({
  title,
  route,
  mutateRoute,
  pathname,
}: any) => {
  return (
    <Table.Row>
      <Table.Cell style={{ display: "flex", padding: 0 }}>
        <Link
          href={{
            pathname: pathname,
          }}
          style={{
            display: "block",
            width: "93%",
            padding: 10,
          }}
        >
          {title}
        </Link>
        {route ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              width: "7%",
            }}
          >
            <TitleModal
              route={route}
              mutateRoute={mutateRoute}
              method="PATCH"
              title={title}
              triggerNode={
                <Icon style={{ cursor: "pointer" }} name="pencil alternate" />
              }
            />
            <DeleteComponent route={route} mutateRoute={mutateRoute} />
          </div>
        ) : null}
      </Table.Cell>
    </Table.Row>
  );
};

export default TableRowTitleComponent;
