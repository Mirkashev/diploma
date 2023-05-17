import { Form, Input, Button, Container, Icon, Menu, Popup } from 'semantic-ui-react'
import styles from './index.module.css'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import AddModal from '@/components/common/modal/title/Component'
import  Table  from  '@/components/common/table'

interface AdminThemeInterface {
  themes: Array<any>,
  children: ReactNode
}

export default function AdminThemesComponent({ themes, children }: AdminThemeInterface){


  return(
    <Container as='main' className={styles.container} >
      {themes ? 
      <>
        <Menu style={{width:'100%', marginBottom: '0'}}>
          {children}
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
      </>
      : 
      <h1>loading...</h1>}
    </Container>
  )
}