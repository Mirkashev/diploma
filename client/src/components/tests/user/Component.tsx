import { ChapterTestsInterface } from "../../interfaces";
import { Table } from "semantic-ui-react";
import Link from "next/link";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import ComponentCustomTable from "@/components/common/table/customTable";

export default function UserTestComponent({
  tests,
  themeId,
}: ChapterTestsInterface) {
  return (
    <>
      <TopicsTabs>
        <ComponentCustomTable headerArray={["Список тестов:"]}>
          <Table.Body>
            {tests?.map((el, i) => (
              <Table.Row key={i + Math.random()}>
                <Table.Cell style={{ padding: 0 }}>
                  <Link
                    style={{
                      width: "100%",
                      display: "block",
                      padding: "10px",
                    }}
                    href={{
                      pathname: `/user/topics/${themeId}/tests/${el.id}`,
                    }}
                  >
                    Начать тест: {el.title}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </ComponentCustomTable>
      </TopicsTabs>
    </>
  );
}
