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
import Link from "next/link";
import { TopicsInterface } from "../interfaces";

export default function TopicsComponent({ topics }: TopicsInterface) {
  return (
    <div
      style={{
        maxHeight: "85vh",
        width: "100%",
        overflowY: "auto",
        border: "1px solid rgba(34,36,38,.15)",
        // borderRadius: "4px",
        // marginTop: "10px",
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {topics?.map((el, i) => (
            <Table.Row key={i + Math.random()}>
              <Table.Cell style={{ padding: 0 }}>
                <Link
                  style={{ display: "block", width: "100%", padding: "10px" }}
                  href={{ pathname: "/user/topics/" + el?.id + "/theory" }}
                >
                  {el.title}
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
