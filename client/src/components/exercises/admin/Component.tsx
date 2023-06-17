import { ChapterExercisesInterface } from "../../interfaces";
import { Table } from "semantic-ui-react";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import TableContainerComponent from "@/components/common/table/tableContainer";
import TableHeaderTitleComponent from "@/components/common/table/tableHeaderTitle";
import TableRowTitleComponent from "@/components/common/table/tableRowTitle";

export default function ChapterExComponent({
  exercises,
  themeId,
  title,
}: ChapterExercisesInterface) {
  return (
    <>
      <TopicsTabs>
        <TableContainerComponent>
          <TableHeaderTitleComponent
            title={"Список упражнений:"}
            route={"/exercises/" + themeId}
            mutateRoute={"/topics/" + themeId}
          />
          <Table.Body>
            {exercises?.map((el) => (
              <TableRowTitleComponent
                key={el.id}
                route={"/exercises/" + el.id}
                mutateRoute={"/topics/" + themeId}
                title={el.title}
                pathname={`/admin/topics/${themeId}/exercises/${el.id}`}
              />
            ))}
          </Table.Body>
        </TableContainerComponent>
      </TopicsTabs>
    </>
  );
}
