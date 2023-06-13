import { Button, Dropdown, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import DeleteComponent from "../../common/deleteButton";
// import { '/questions/', '/tests/', '/questions/' } from "@/constants";
import QuestionModal from "@/components/common/modal/question";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";

export default function TestComponent({
  questions,
  test_id,
  title,
  mainTitle,
}: TestInterface) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      {/* <NavTop3 title={title}>
        <QuestionModal
          route={"/questions/" + test_id}
          mutateRoute={"/tests/" + test_id}
          method="POST"
          modalType="question"
        />
      </NavTop3> */}
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
                <Table.HeaderCell>Список вопросов:</Table.HeaderCell>
                <Table.HeaderCell style={{ width: "5%", padding: 0 }}>
                  <QuestionModal
                    route={"/questions/" + test_id}
                    mutateRoute={"/tests/" + test_id}
                    method="POST"
                    modalType="question"
                    triggerNode={
                      <Button icon="plus" style={{ marginLeft: "12.5px" }} />
                    }
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {questions?.map((el, i) => (
                <Table.Row key={el.title + i}>
                  <Table.Cell>
                    <span>{el.title}</span>
                  </Table.Cell>
                  <Table.Cell
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <QuestionModal
                      route={"/questions/" + el.id}
                      mutateRoute={"/tests/" + test_id}
                      method="PATCH"
                      title={el.title}
                      question={el}
                      triggerNode={
                        <Icon
                          style={{ cursor: "pointer" }}
                          name="pencil alternate"
                        />
                      }
                    />
                    <DeleteComponent
                      route={"/questions/" + el.id}
                      mutateRoute={"/tests/" + test_id}
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
}
