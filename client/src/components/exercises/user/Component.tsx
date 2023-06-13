import { Table } from "semantic-ui-react";
import { ChapterExercisesInterface } from "../../interfaces";
import Link from "next/link";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";

export default function UserExComponent({
  exercises,
  pathname,
  title,
}: ChapterExercisesInterface) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <TabsNavComponent
        links={[
          {
            key: "topics",
            name: "Назад",
            onClick: () => router.push(`/user/topics`),
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
            active: false,
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
            // borderRadius: "4px",
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
                <Table.HeaderCell>Название</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exercises?.map((el, i) => (
                <Table.Row key={i + Math.random()}>
                  <Table.Cell>
                    <Link href={{ pathname: pathname + "/" + el?.id }}>
                      Начать упражнение: {el.title}
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
