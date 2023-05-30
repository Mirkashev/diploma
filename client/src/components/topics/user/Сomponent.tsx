import { Form, Input, Button, Container, Icon, Menu, Popup, Table } from 'semantic-ui-react'
import AddModal from '@/components/common/modal'
import Link from 'next/link'
// import  Table  from  '@/components/common/table'

interface TopicsInterface {
  themes: Array<any>,
  isAdmin?: boolean,
}

export default function TopicsComponent({ themes }: TopicsInterface){

  return(
    <Container as='main' style={{
      flexGrow: 1,
      maxWidth: '720px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: '72px',
      position: 'relative'
    }} >
      <Menu style={{width:'100%', marginBottom: '0'}}>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input disabled icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Название</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          <Table.Body>
          {themes?.map((el, i) => 
            <Table.Row key={i + Math.random()}>
              <Table.Cell>
                <Link href={{pathname: '/user/topics/' + el?.id + '/theory'}} 
                  // onClick={()=> setPageTitle(el.title)}
                  >
                  {el.title || el.login}
                </Link> 
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </Container>
  )
}