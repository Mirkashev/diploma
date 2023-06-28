import { Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import DeleteComponent from "../../common/deleteButton";
import QuestionModal from "@/components/common/modal/question";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import ComponentCustomTable from "@/components/common/table/customTable";
import RowSettings from "@/components/common/table/rowSettings";

export default function TestComponent({ questions, test_id }: TestInterface) {
  return (
    <TopicsTabs>
      <ComponentCustomTable
        headerArray={[
          <>
            <span style={{ display: "inline-block", marginRight: "4px" }}>
              Список вопросов:
            </span>
            <QuestionModal
              route={"/questions/" + test_id}
              mutateRoute={"/tests/" + test_id}
              method="POST"
              modalType="question"
              triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
            />
          </>,
        ]}
      >
        <Table.Body>
          {questions?.map((el) => (
            <Table.Row key={el.id}>
              <Table.Cell style={{ display: "flex", padding: 0 }}>
                <span style={{ display: "block", width: "95%", padding: 10 }}>
                  {el.title}
                </span>
                <RowSettings
                  type={"question"}
                  route={"/questions/" + el.id}
                  mutateRoute={"/tests/" + test_id}
                  title={el.title}
                  question={el}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </ComponentCustomTable>
    </TopicsTabs>
  );
}
