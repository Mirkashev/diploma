import { Button, Dropdown, Form, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import NavTop3 from "../../common/nav/top-layer3/Сomponent";
import UserTestQuestionComponent from "./question/Component";

const UserTestComponent = ({ questions, title, submit }: TestInterface)=> {
  return(
    <Form onSubmit={submit}>
      <NavTop3 title={title}>
        <Button type='submit' style={{margin: 0, borderRadius:0}}>Завершить тест</Button>
      </NavTop3>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Вопрос</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
          {questions?.map((el, i) => 
            <Table.Row key={el.title + i}>
              <Table.Cell>
                <UserTestQuestionComponent question={el}/>
              </Table.Cell>
            </Table.Row>)}
      </Table.Body>
    </Table>
    </Form>
  )
}

export default UserTestComponent;