import {
  Form,
  Input,
  Button,
  Container,
  Icon,
  Menu,
  Popup,
  Table,
} from "semantic-ui-react";
import { TopicsInterface } from "../interfaces";
import Link from "next/link";
import DeleteComponent from "@/components/common/deleteButton";
import TitleModal from "@/components/common/modal/titleNew";

const AdminTopicsComponent = ({ topics }: TopicsInterface) => {
  return (
    <>
      <div
        style={{
          maxHeight: "85vh",
          width: "100%",
          overflowY: "auto",
          border: "1px solid rgba(34,36,38,.15)",
        }}
      >
        <Table celled style={{ border: "none", borderRadius: 0 }}>
          <Table.Header
            style={{
              position: "sticky",
              top: "0px",
            }}
          >
            <Table.Row>
              <Table.HeaderCell>Список тем</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%", padding: 0 }}>
                <TitleModal
                  route={"/topics/"}
                  method="POST"
                  triggerNode={
                    <Button icon="plus" style={{ margin: "0 0 0 12.5px" }} />
                  }
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body style={{ borderRadius: 0 }}>
            {topics?.map((el, i) => (
              <Table.Row key={i + Math.random()}>
                <Table.Cell>
                  <Link href={{ pathname: `/admin/topics/${el.id}/theory` }}>
                    {el.title}
                  </Link>
                </Table.Cell>
                <Table.Cell
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TitleModal
                    route={"/topics/" + el.id}
                    getRoute={"/topics/" + el.id}
                    mutateRoute={"/topics/"}
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
                    route={"/topics/" + el.id}
                    mutateRoute={"/topics/"}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default AdminTopicsComponent;
