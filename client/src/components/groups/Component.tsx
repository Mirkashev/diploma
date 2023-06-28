import { Icon, Table } from "semantic-ui-react";
import ComponentCustomTable from "../common/table/customTable";
import TitleModal from "../common/modal/titleNew";
import Link from "next/link";
import DeleteComponent from "../common/deleteButton";

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
          <Table.Row key={el.id}>
            <Table.Cell style={{ display: "flex", padding: 0 }}>
              <Link
                href={{
                  pathname: `/${user?.role}/groups/${el.id}`,
                }}
                style={{
                  display: "block",
                  width: "93%",
                  padding: 10,
                }}
              >
                {el.title}
              </Link>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 10,
                  width: "7%",
                }}
              >
                <TitleModal
                  route={"/groups/" + el.id}
                  mutateRoute={"/groups/"}
                  method="PATCH"
                  title={el.title}
                  triggerNode={
                    <Icon
                      style={{ cursor: "pointer" }}
                      name="pencil alternate"
                    />
                  }
                />
                <DeleteComponent
                  route={"/groups/" + el.id}
                  mutateRoute={"/groups/"}
                />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </ComponentCustomTable>
  );
};

export default ComponentGroups;
