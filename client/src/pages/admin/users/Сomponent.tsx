import { Form, Input, Button, Container } from 'semantic-ui-react'
import styles from './index.module.css'

export default function AdminUsersComponent(){

  return(
    <Container as='main' className={styles.container} >
      <h1>Users</h1>
    </Container>
  )
}