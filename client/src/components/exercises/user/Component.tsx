import { Table } from "semantic-ui-react";
import { ChapterExercisesInterface } from "../../interfaces";
import Link from "next/link";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import TableContainerComponent from "@/components/common/table/tableContainer";
import TableHeaderComponent from "@/components/common/table/tableHeader";
import TableRowMonolitComponent from "@/components/common/table/tableRowTitle";

export default function UserExComponent({
  exercises,
  pathname,
  title,
}: ChapterExercisesInterface) {
  return (
    <>
      <TopicsTabs>
        <TableContainerComponent>
          <TableHeaderComponent>
            <Table.HeaderCell>Список упражнений:</Table.HeaderCell>
          </TableHeaderComponent>
          <Table.Body>
            {exercises?.map((el) => (
              <Table.Row key={el.id}>
                <Table.Cell style={{ padding: 0 }}>
                  <Link
                    style={{ display: "block", width: "100%", padding: "10px" }}
                    href={{ pathname: pathname + "/" + el?.id }}
                  >
                    Начать упражнение: {el.title}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </TableContainerComponent>
      </TopicsTabs>
    </>
  );
}
