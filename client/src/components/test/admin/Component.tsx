import { Button, Dropdown, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import DeleteComponent from "../../common/deleteButton";
// import { '/questions/', '/tests/', '/questions/' } from "@/constants";
import QuestionModal from "@/components/common/modal/question";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import TableContainerComponent from "@/components/common/table/tableContainer";
import TableHeaderComponent from "@/components/common/table/tableHeader";

export default function TestComponent({
  questions,
  test_id,
  title,
  mainTitle,
}: TestInterface) {
  return (
    <>
      <TopicsTabs>
        <TableContainerComponent>
          <TableHeaderComponent>
            <Table.HeaderCell style={{ padding: 10 }}>
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
            </Table.HeaderCell>
          </TableHeaderComponent>
          <Table.Body>
            {questions?.map((el) => (
              <Table.Row key={el.id}>
                <Table.Cell style={{ display: "flex" }}>
                  <span style={{ display: "block", width: "95%" }}>
                    {el.title}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      width: "5%",
                      justifyContent: "space-between",
                    }}
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
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </TableContainerComponent>
      </TopicsTabs>
    </>
  );
}
