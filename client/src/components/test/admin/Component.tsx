import { Button, Dropdown, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import NavTop3 from "../../common/nav/top-layer3/Сomponent";
import DeleteComponent from "../../common/deleteButton";
// import { '/questions/', '/tests/', '/questions/' } from "@/constants";
import QuestionModal from "@/components/common/modal/question";
import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import SideNav from "@/components/common/nav/left-side";

export default function TestComponent({ questions, test_id, title, mainTitle }: TestInterface){
  return(
    <>
      <NavTop2 title={mainTitle}/>
      <SideNav>
        <NavTop3 title={title}>
            <QuestionModal 
              route={'/questions/' + test_id} 
              mutateRoute={'/tests/' + test_id}
              method='POST' 
              modalType='question' 
            />
        </NavTop3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Вопрос теста</Table.HeaderCell>
              <Table.HeaderCell style={{width:'5%'}}>Настройки</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
            <Table.Body>
            {questions?.map((el, i) => 
              <Table.Row key={el.title + i}>
                <Table.Cell>
                  <span>{el.title}</span>
                </Table.Cell>
                <Table.Cell style={{display:'flex', justifyContent: 'space-between'}}>
                  <QuestionModal 
                    route={'/questions/'+el.id} 
                    mutateRoute={'/tests/'+test_id}
                    method='PATCH' 
                    title={el.title}
                    question={el} 
                    triggerNode={<Icon style={{cursor:'pointer'}} name='pencil alternate' />}
                  />
                  <DeleteComponent route={'/questions/'+el.id} mutateRoute={'/tests/'+test_id} />
                </Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </SideNav>
    </>
  )
}