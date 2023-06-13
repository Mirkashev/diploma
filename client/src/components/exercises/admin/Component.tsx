import { ChapterExercisesInterface } from "../../interfaces";
import TitleModal from "@/components/common/modal/titleNew";
import { Button, Icon, Table } from "semantic-ui-react";
import Link from "next/link";
import DeleteComponent from "@/components/common/deleteButton";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";

export default function ChapterExComponent({
  exercises,
  themeId,
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
            onClick: () => router.push(`/admin/topics`),
          },
          {
            key: "theory",
            name: "Теория",
            active: !!router.pathname.match("/theory"),
            onClick: () => router.push(`/admin/topics/${id}/theory`),
          },
          {
            key: "tests",
            name: "Тесты",
            active: false,
            onClick: () => router.push(`/admin/topics/${id}/tests`),
          },
          {
            key: "exercises",
            name: "Упражнения",
            active: !!router.pathname.match("/exercises"),
            onClick: () => router.push(`/admin/topics/${id}/exercises`),
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
                <Table.HeaderCell style={{ width: "5%", padding: 0 }}>
                  <TitleModal
                    route={"/exercises/" + themeId}
                    method="POST"
                    mutateRoute={"/topics/" + themeId}
                    triggerNode={
                      <Button icon="plus" style={{ marginLeft: 12.5 }} />
                    }
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exercises?.map((el, i) => (
                <Table.Row key={i + Math.random()}>
                  <Table.Cell>
                    <Link
                      href={{
                        pathname: `/admin/topics/${themeId}/exercises/${el.id}`,
                      }}
                    >
                      {el.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TitleModal
                      route={"/exercises/" + el.id}
                      method="PATCH"
                      mutateRoute={"/topics/" + themeId}
                      triggerNode={
                        <Icon
                          style={{ cursor: "pointer" }}
                          name="pencil alternate"
                        />
                      }
                      title={el.title}
                    />
                    <DeleteComponent
                      route={"/exercises/" + el.id}
                      mutateRoute={"/topics/" + themeId}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </TabsNavComponent>

      {/* </SideNav> */}
    </>
  );
}
