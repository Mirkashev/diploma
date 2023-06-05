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
    <Container
      as="main"
      style={{
        flexGrow: 1,
        maxWidth: "720px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "72px",
        position: "relative",
      }}
    >
      <Menu style={{ width: "100%", marginBottom: "0" }}>
        <TitleModal route={"/topics/"} method="POST" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input disabled icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <div
        style={{
          maxHeight: "65vh",
          width: "100%",
          overflowY: "auto",
          border: "1px solid rgba(34,36,38,.15)",
          borderRadius: "4px",
          marginTop: "10px",
        }}
      >
        <Table celled style={{ border: "none" }}>
          <Table.Header
            style={{
              position: "sticky",
              top: "0px",
            }}
          >
            <Table.Row>
              <Table.HeaderCell>Тема</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }}>
                Настройки
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
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
    </Container>
  );
};

export default AdminTopicsComponent;
