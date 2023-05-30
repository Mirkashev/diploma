import { Form, Input, Button, Container, Table } from 'semantic-ui-react'
import styles from './index.module.css'
import { useGetData } from '@/hooks/fetching'

export default function AdminStatsComponent(){

  const { data, isLoading, isError } = useGetData('/results/');

  if(isLoading) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  console.log(data);

  return(
      <Container as='main' className={styles.container} >
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Группа</Table.HeaderCell>
              <Table.HeaderCell>Тема</Table.HeaderCell>
              <Table.HeaderCell>Тест</Table.HeaderCell>
              <Table.HeaderCell>ФИО</Table.HeaderCell>
              <Table.HeaderCell>Проценты</Table.HeaderCell>
              <Table.HeaderCell>Дата прохождения</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
            <Table.Body>
            {data?.map((el:any, i:any) => 
              <Table.Row key={el.id + i * Math.random()}>
                <Table.Cell>{i}</Table.Cell>
                <Table.Cell>{el?.user?.group?.title || '-'}</Table.Cell>
                <Table.Cell>{el?.test?.theme?.title || '-'}</Table.Cell>
                <Table.Cell>{el?.test?.title || '-'}</Table.Cell>
                <Table.Cell>{el?.user?.surname || '-'} {el?.user?.firstName || '-'} {el?.user?.lastName || '-'}</Table.Cell>
                <Table.Cell>{el?.percent || '-'}%</Table.Cell>
                <Table.Cell>{new Date(el?.createdAt).toLocaleDateString('ru')|| '-'} {`${new Date(el?.createdAt).getHours()}:${new Date(el?.createdAt).getMinutes()}` || '-'}</Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Container>
  )
}