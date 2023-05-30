import { Icon, Table } from "semantic-ui-react";
import EditUserModal from '@/components/common/modal/user/'
import DeleteComponent from "../../deleteButton";
import Link from "next/link";

export default function UsersTable({array, pathname, route}: any) {
  const preventDefault = (e:any) => e.preventDefault();
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Логин</Table.HeaderCell>
          <Table.HeaderCell>Фамилия</Table.HeaderCell>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.HeaderCell>Отчество</Table.HeaderCell>
          <Table.HeaderCell>Группа</Table.HeaderCell>
          <Table.HeaderCell>Роль</Table.HeaderCell>
          <Table.HeaderCell style={{width:'5%'}}>Настройки</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
        {array?.map((el:any, i:any) => 
          <Table.Row key={el.login + i}>
            <Table.Cell>
              { pathname ? 
              <Link href={{pathname: `${pathname}/${el.id}`}}>
                {el.login}
              </Link> 
              :
              <span>{el.login}</span>
              }
            </Table.Cell>
            <Table.Cell>{el?.surname || 'не указана'}</Table.Cell>
            <Table.Cell>{el?.firstName || 'не указано'}</Table.Cell>
            <Table.Cell>{el?.lastName || 'не указано'}</Table.Cell>
            <Table.Cell>{el?.group?.title || 'не указана'}</Table.Cell>
            <Table.Cell>{el?.role || 'не указана'}</Table.Cell>
            <Table.Cell style={{display:'flex', justifyContent: 'space-between'}}>
              <EditUserModal 
                route={route+(el.id +'')}
                getRoute={route+(el.id +'')}
                mutateRoute={route}
                method='PATCH' 
                title={el.login} 
                triggerNode={<Icon style={{cursor:'pointer'}} name='pencil alternate' />}
              />
              <DeleteComponent route={route+el.id} mutateRoute={route} />
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  )
}