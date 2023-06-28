import { ChapterExercisesInterface } from "../../interfaces";
import { Icon, Table } from "semantic-ui-react";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import ComponentCustomTable from "@/components/common/table/customTable";
import TitleModal from "@/components/common/modal/titleNew";
import RowSettings from "@/components/common/table/rowSettings";
import Link from "next/link";

export default function ChapterExComponent({
  exercises,
  themeId,
}: ChapterExercisesInterface) {
  return (
    <TopicsTabs>
      <ComponentCustomTable
        headerArray={[
          <>
            <span style={{ display: "inline-block", marginRight: "4px" }}>
              Список упражнений:
            </span>
            <TitleModal
              method="POST"
              route={"/exercises/" + themeId}
              mutateRoute={"/topics/" + themeId}
              triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
            />
          </>,
        ]}
      >
        <Table.Body>
          {exercises?.map((el) => (
            <Table.Row key={el.id}>
              <Table.Cell style={{ display: "flex", padding: 0 }}>
                <Link
                  href={{
                    pathname: `/admin/topics/${themeId}/exercises/${el.id}`,
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
                  route={"/exercises/" + el.id}
                  mutateRoute={"/topics/" + themeId}
                  title={el.title}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </ComponentCustomTable>
    </TopicsTabs>
  );
}
