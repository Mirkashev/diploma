import { Form, Input, Button, Container, Icon, Menu, Popup } from 'semantic-ui-react'
import styles from './index.module.css'
import AddModal from '@/components/common/modal'
import  Table  from  '@/components/common/table'

interface TopicsInterface {
  themes: Array<any>,
  isAdmin: boolean,
}

export default function TopicsComponent({ themes, isAdmin }: TopicsInterface){

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
        {isAdmin ? <AddModal route={'/themes'} method='POST'/> : ''}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input disabled icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Table
        pathname='/admin/topics'
        array={themes}
      />
    </Container>
  )
}