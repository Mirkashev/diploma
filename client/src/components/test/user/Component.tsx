import { Button, Form, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import UserTestQuestionComponent from "./question/Component";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import ComponentCustomTable from "@/components/common/table/customTable";

const UserTestComponent = ({ questions, title, submit }: TestInterface) => {
  return (
    <TopicsTabs>
      <Form onSubmit={submit}>
        <ComponentCustomTable
          headerArray={[
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
            </div>,
          ]}
        >
          <Table.Body>
            {questions?.map((el, i) => (
              <Table.Row key={el.title + i}>
                <Table.Cell>
                  <UserTestQuestionComponent question={el} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </ComponentCustomTable>
      </Form>
    </TopicsTabs>
  );
};

export default UserTestComponent;
