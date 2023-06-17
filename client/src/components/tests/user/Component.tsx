import { ChapterTestsInterface } from "../../interfaces";
import { Table } from "semantic-ui-react";
import Link from "next/link";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";

export default function UserTestComponent({
  tests,
  themeId,
  title,
}: ChapterTestsInterface) {
  return (
    <>
      <TopicsTabs>
        <div
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            border: "1px solid rgba(34,36,38,.15)",
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
                <Table.HeaderCell>Список тестов:</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
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
          </Table>
        </div>
      </TopicsTabs>
    </>
  );
}
