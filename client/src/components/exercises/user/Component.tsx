import { Table } from "semantic-ui-react";
import { ChapterExercisesInterface } from "../../interfaces";
import Link from "next/link";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import ComponentCustomTable from "@/components/common/table/customTable";

export default function UserExComponent({
  exercises,
  pathname,
}: ChapterExercisesInterface) {
  return (
    <TopicsTabs>
      <ComponentCustomTable headerArray={["Список упражнений:"]}>
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
      </ComponentCustomTable>
    </TopicsTabs>
  );
}
