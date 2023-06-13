import { Button, Dropdown, Form, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import NavTop3 from "../../common/nav/top-layer3/Сomponent";
import UserTestQuestionComponent from "./question/Component";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";

const UserTestComponent = ({ questions, title, submit }: TestInterface) => {
  const router = useRouter();
  const { id } = router.query;
  return (
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
      <Form onSubmit={submit}>
        {/* <NavTop3 title={title}>
        <Button type='submit' style={{margin: 0, borderRadius:0}}>Завершить тест</Button>
      </NavTop3> */}
        <div
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            border: "1px solid rgba(34,36,38,.15)",
            // borderRadius: "4px",
          }}
        >
          <Table celled style={{ border: "none" }}>
            <Table.Header style={{ position: "sticky", top: 0 }}>
              <Table.Row>
                <Table.HeaderCell>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span>Список вопросов:</span>
                    <Button type="submit">Проверить</Button>
                  </div>
                </Table.HeaderCell>
                {/* <Table.HeaderCell>dsa</Table.HeaderCell>
                 */}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {questions?.map((el, i) => (
                <Table.Row key={el.title + i}>
                  <Table.Cell>
                    <UserTestQuestionComponent question={el} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Form>
    </TabsNavComponent>
  );
};

export default UserTestComponent;
