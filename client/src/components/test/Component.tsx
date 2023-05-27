import { Button, Dropdown, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../interfaces";
import NavTop3 from "../common/nav/top-layer3/Сomponent";
import Modal from '../common/modal'
import DeleteComponent from "../common/deleteButton";
import { GET_QUESTION_WITH_ANSWERS, GET_TEST_WITH_QUESTIONS, QUESTION_ROUTE } from "@/constants";

export default function TestComponent({ questions, test_id, title }: TestInterface){
  return(
    <>
      <NavTop3 title={title}>
        <Modal 
          route={QUESTION_ROUTE + test_id} 
          mutateRoute={GET_TEST_WITH_QUESTIONS + test_id}
          method='POST' 
          modalType='question' 
          triggerNode={<Button style={{margin:0, borderRadius:0}}>Добавить вопрос</Button>}
        />
      </NavTop3>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Название</Table.HeaderCell>
          <Table.HeaderCell style={{width:'5%'}}>Настройки</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
        {questions?.map((el, i) => 
          <Table.Row key={el.title + i}>
            <Table.Cell>
              <Modal 
                route={QUESTION_ROUTE+el.id} 
                getRoute={GET_QUESTION_WITH_ANSWERS+el.id}
                mutateRoute={GET_TEST_WITH_QUESTIONS+test_id}
                method='PATCH' 
                modalType='question' 
                title={el.title} 
                triggerNode={<span style={{cursor:'pointer'}}>{el.title}</span>}
              />
            </Table.Cell>
            <Table.Cell style={{display:'flex', justifyContent: 'space-between'}}>
              <Modal 
                route={QUESTION_ROUTE+el.id} 
                getRoute={GET_QUESTION_WITH_ANSWERS+el.id}
                mutateRoute={GET_TEST_WITH_QUESTIONS+test_id}
                method='PATCH' 
                modalType='question' 
                title={el.title} 
                triggerNode={<Icon style={{cursor:'pointer'}} name='pencil alternate' />}
              />
              <DeleteComponent route={QUESTION_ROUTE+el.id} mutateRoute={GET_TEST_WITH_QUESTIONS+test_id} />
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
    </>
  )
}