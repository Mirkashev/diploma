import { Button, Dropdown, Form, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import UserTestQuestionComponent from "./question/Component";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import TableContainerComponent from "@/components/common/table/tableContainer";

const UserTestComponent = ({ questions, title, submit }: TestInterface) => {
  return (
    <TopicsTabs>
      <Form onSubmit={submit}>
        <TableContainerComponent>
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
        </TableContainerComponent>
      </Form>
    </TopicsTabs>
  );
};

export default UserTestComponent;
