import { Form, Input, Button, Container, Icon, Menu, Popup } from 'semantic-ui-react'
import styles from './index.module.css'
import AddModal from '@/components/common/modal/title'
import  Table  from  '@/components/common/table'

interface TopicsInterface {
  themes: Array<any>,
  isAdmin: boolean,
}

export default function TopicsComponent({ themes, isAdmin }: TopicsInterface){

  return(
    <Container as='main' className={styles.container} >
      <Menu style={{width:'100%', marginBottom: '0'}}>
        {isAdmin ? <AddModal title={'Добавить тему'} route={'/themes'}/> : ''}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input disabled icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Table
        pathname='/admin/topic'
        array={themes}
      />
    </Container>
  )
}