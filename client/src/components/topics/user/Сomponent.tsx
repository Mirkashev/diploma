import { Table } from "semantic-ui-react";
import Link from "next/link";
import { TopicsInterface } from "../interfaces";
import ComponentCustomTable from "@/components/common/table/customTable";

export default function TopicsComponent({ topics }: TopicsInterface) {
  return (
    <ComponentCustomTable headerArray={["Список тем:"]}>
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
    </ComponentCustomTable>
  );
}
