import { Form, Input, Button, Container, Table, Icon, Menu, Segment, Grid, Item } from 'semantic-ui-react';
import Link from 'next/link';
import { TableInterface } from './table.interfaces';



export default function TableComponent({array, pathname, toggleShowTest, setTestWindowData}: TableInterface) {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Название</Table.HeaderCell>
          <Table.HeaderCell style={{width:'5%'}}>Настройки</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
        {
          array?.map((el, i) => 
            <Table.Row key={'themes_' + i}>
              <Table.Cell>
                {pathname 
                  ? 
                  <Link href={{pathname: pathname, query: {id: el.id}}}>{el.title}</Link> 
                  : 
                  <a onClick={()=>{
                    toggleShowTest ? toggleShowTest(true) : null;
                    setTestWindowData ? setTestWindowData(el) : null;
                  }} style={{cursor:'pointer'}}>{el.title}</a>
                }
              </Table.Cell>
              <Table.Cell style={{display:'flex', justifyContent: 'space-between'}}>
                <Icon name='pencil alternate' />
                <Icon name='trash alternate'/>
              </Table.Cell>
            </Table.Row>
          )
        }
      </Table.Body>
    </Table>
  )
}