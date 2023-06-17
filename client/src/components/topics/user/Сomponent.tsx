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
import TableContainerComponent from "@/components/common/table/tableContainer";
import TableHeaderComponent from "@/components/common/table/tableHeader";
import TableRowMonolitComponent from "@/components/common/table/tableRowTitle";

export default function TopicsComponent({ topics }: TopicsInterface) {
  return (
    <TableContainerComponent>
      <TableHeaderComponent>
        <Table.HeaderCell>Список тем:</Table.HeaderCell>
      </TableHeaderComponent>
      <Table.Body>
        {topics?.map((el, i) => (
          <Table.Row key={el.id}>
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
    </TableContainerComponent>
  );
}
