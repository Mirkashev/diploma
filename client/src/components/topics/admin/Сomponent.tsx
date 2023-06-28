import ComponentCustomTable from "@/components/common/table/customTable";
import { TopicsInterface } from "../interfaces";
import { Icon, Table } from "semantic-ui-react";
import TitleModal from "@/components/common/modal/titleNew";
import Link from "next/link";
import RowSettings from "@/components/common/table/rowSettings";

const AdminTopicsComponent = ({ topics }: TopicsInterface) => {
  return (
    <ComponentCustomTable
      headerArray={[
        <>
          <span style={{ display: "inline-block", marginRight: "4px" }}>
            Список тем:
          </span>
          <TitleModal
            method="POST"
            route={"/topics/"}
            mutateRoute={"/topics/"}
            triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
          />
        </>,
      ]}
    >
      <Table.Body>
        {topics?.map((el) => (
          <Table.Row key={el.id}>
            <Table.Cell style={{ display: "flex", padding: 0 }}>
              <Link
                href={{
                  pathname: `/admin/topics/${el.id}/theory`,
                }}
                style={{
                  display: "block",
                  width: "93%",
                  padding: 10,
                }}
              >
                {el.title}
              </Link>
              <RowSettings
                route={"/topics/" + el.id}
                mutateRoute={"/topics/"}
                title={el.title}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </ComponentCustomTable>
  );
};

export default AdminTopicsComponent;
