import { ChapterTestsInterface } from "../../interfaces";
import { Button, Icon, Table } from "semantic-ui-react";
import Link from "next/link";
import DeleteComponent from "@/components/common/deleteButton";
import TitleModal from "@/components/common/modal/titleNew";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";

const AdminTestComponent = ({
  themeId,
  tests,
  title,
}: ChapterTestsInterface) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <TabsNavComponent
        links={[
          {
            key: "topics",
            name: "Назад",
            onClick: () => router.push("/admin/topics"),
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
            active: !!router.pathname.match("/tests"),
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
                <Table.HeaderCell style={{ width: "5%", padding: 0 }}>
                  <TitleModal
                    route={"/tests/" + themeId}
                    method="POST"
                    mutateRoute={"/topics/" + themeId}
                    triggerNode={
                      <Button icon="plus" style={{ marginLeft: "12.5px" }} />
                    }
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tests?.map((el, i) => (
                <Table.Row key={i + Math.random()}>
                  <Table.Cell style={{ padding: 0 }}>
                    <Link
                      href={{
                        pathname: `/admin/topics/${themeId}/tests/${el.id}`,
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px",
                      }}
                    >
                      {el.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TitleModal
                      route={"/tests/" + el.id}
                      mutateRoute={"/topics/" + themeId}
                      method="PATCH"
                      title={el.title}
                      triggerNode={
                        <Icon
                          style={{ cursor: "pointer" }}
                          name="pencil alternate"
                        />
                      }
                    />
                    <DeleteComponent
                      route={"/tests/" + el.id}
                      mutateRoute={"/topics/" + themeId}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </TabsNavComponent>
    </>
  );
};

export default AdminTestComponent;
