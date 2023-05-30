import { Form, Input, Button, Container, Table, Icon, Menu, Segment, Grid, Item } from 'semantic-ui-react';
import Link from 'next/link';
import { TableInterface } from './table.interfaces';
import DeleteComponent from '../deleteButton';
import AddModal from '../modal';



export default function TableComponent({array, pathname, route, mutateRoute, modalType}: TableInterface) {
  const setPageTitle = (itemName: string)=> {
    if(pathname === '/admin/topics') {
      localStorage.setItem('title', itemName)
    }
  }

  const truePathname = (id:any)=> pathname === '/admin/topics' ? `${pathname}/${id}/theory` : `${pathname}/${id}`;

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Название</Table.HeaderCell>
          <Table.HeaderCell style={{width:'5%'}}>Настройки</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
        {array?.map((el, i) => 
          <Table.Row key={i + Math.random()}>
            <Table.Cell>
              {pathname ? 
              <Link href={{pathname: truePathname(el.id)}} 
                onClick={()=> setPageTitle(el.title)}>
                {el.title || el.login}
              </Link> 
              :
              <AddModal 
                modalType={modalType}
                route={route+(el.id +'')}
                mutateRoute={mutateRoute}
                getRoute={route+(el.id +'')}
                method='PATCH' 
                title={el.title || el.login} 
                triggerNode={<span onClick={(e:any)=> e.preventDefault()} style={{cursor:'pointer'}}>{el.title || el.login} </span>}
              />
              }
            </Table.Cell>
            <Table.Cell style={{display:'flex', justifyContent: 'space-between'}}>
              <AddModal 
                modalType={modalType}
                route={route+(el.id +'')}
                getRoute={route+(el.id +'')}
                mutateRoute={mutateRoute}
                method='PATCH' 
                title={el.title || el.login} 
                triggerNode={<Icon onClick={(e:any)=> e.preventDefault()} style={{cursor:'pointer'}} name='pencil alternate' />}
              />
              <DeleteComponent route={route+el.id} mutateRoute={mutateRoute} />
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  )
}