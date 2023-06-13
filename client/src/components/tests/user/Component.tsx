import { ChapterTestsInterface } from "../../interfaces";
import { Table } from "semantic-ui-react";
import Link from "next/link";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";

export default function UserTestComponent({
  tests,
  themeId,
  title,
}: ChapterTestsInterface) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <TabsNavComponent
        links={[
          {
            key: "topics",
            name: "Назад",
            onClick: () => router.push("/user/topics"),
          },
          {
            key: "theory",
            name: "Теория",
            active: !!router.pathname.match("/theory"),
            onClick: () => router.push(`/user/topics/${id}/theory`),
          },
          {
            key: "tests",
            name: "Тесты",
            active: !!router.pathname.match("/tests"),
            onClick: () => router.push(`/user/topics/${id}/tests`),
          },
          {
            key: "exercises",
            name: "Упражнения",
            active: !!router.pathname.match("/exercises"),
            onClick: () => router.push(`/user/topics/${id}/exercises`),
          },
        ]}
      >
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
                <Table.HeaderCell>Название теста</Table.HeaderCell>
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
      </TabsNavComponent>
    </>
  );
}
